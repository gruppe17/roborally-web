import { ReactNode, useMemo, useState, useContext } from "react";
import { Board, noBoardBoard } from '../types/Board';
import { NO_GAME_GAMEID } from "../types/Game";
import BoardContext from "./BoardContext";
import GameApi from '../api/GameApi';
import UserContext from './UserContext';
import { Space } from "../types/Space";
import { NO_USER_USERID } from '../types/User';

type BoardContextProviderPropsType = {
    children : ReactNode
}

const BoardContextProvider = ({ children } : BoardContextProviderPropsType) => {
    const {currentUser} = useContext(UserContext)

    const [loaded, setLoaded] = useState<boolean>(false);
    const [currentBoard, setCurrentBoard] = useState<Board>(noBoardBoard);
      const playerCount = useMemo(
        () => (currentBoard.playerDtos ? currentBoard.playerDtos.length : 0),
        [currentBoard.playerDtos]
      );
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(NO_USER_USERID);

    const switchToNextPlayer = async () => {
        if (!currentBoard || !playerCount) return;
        if ((currentBoard.currentPlayerDto?.playerId !== currentUser?.userId)) return;

        await GameApi.switchPlayer(currentUser.currentGameId)
            .then(() => {
            const newPlayerIndex = (currentPlayerIndex + 1) % playerCount;

            setCurrentPlayerIndex(newPlayerIndex);
            })
            .catch(() => console.error("Error while switching player"));
    };

      //Define a function used to set a player ona  specific space
    const setPlayerOnSpace = async (space: Space) => {
        if (!currentBoard) return;
        //Check if space already has a player standing on it
        if (space.playerId) return;
        if (currentBoard.currentPlayerDto?.playerId !== currentUser?.userId) return;
        await GameApi.moveCurrentPlayer(currentBoard.gameId, {
        ...space,
        playerId: currentBoard!.currentPlayerDto?.playerId,
        })
        .then(() => {
            let tempSpaces = [...currentBoard!.spaceDtos]; //Use spread operator to copy spaces array, needed for making immutable changes
            //See https://bit.ly/2My8Bfz, until the section about Immutable.js
            tempSpaces[space.x][space.y].playerId =
            currentBoard!.currentPlayerDto?.playerId; //Set the player on the new space they clicked on

            if (
            currentBoard!.currentPlayerDto?.x !== undefined &&
            currentBoard!.currentPlayerDto?.y !== undefined
            ) {
            //If the player was standing on a space previously, remove them from that space
            tempSpaces[currentBoard!.currentPlayerDto?.x][
                currentBoard!.currentPlayerDto?.y
            ].playerId = undefined;
            }
            setLoaded(true);
            updateBoardContext();
        })
        .catch(() => {
            //console.error("Error while fetching board from backend");
        });
    };


    const getUpdatedBoard = async () => {
      console.log("getUpdatedBoard: getting updated board")
      if (currentUser.currentGameId === NO_GAME_GAMEID) {
        console.log("getUpdatedBoard: currentUser.currentGameId is " + currentUser.currentGameId + ". Returning noBoardBoard")
        return noBoardBoard
      }
      console.log("getUpdatedBoard: Current User in getUpdatedBoard:")
      console.log(currentUser)
      console.log("getUpdatedBoard: getting board from backend")
      const fetchedBoard = (await GameApi.getBoard(currentUser.currentGameId)).data
      console.log("getUpdatedBoard: recived board from backend:")
      console.log(fetchedBoard)
      let updatedBord = currentBoard
      updatedBord.gameId = fetchedBoard.gameId; //Why does board have a game id? We only ever display one at a time
      updatedBord.spaceDtos = fetchedBoard.spaceDtos
      updatedBord.playerDtos = fetchedBoard.playerDtos
      updatedBord.width = fetchedBoard.width
      updatedBord.height = fetchedBoard.height

      if (!(fetchedBoard.currentPlayerDto)) 
        updatedBord.currentPlayerDto = fetchedBoard.currentPlayerDto
      console.log("getUpdatedBoard: Returning board from backend:")
      console.log(updatedBord)
      return updatedBord;
    }

    const updateBoardContext = async () => {
      console.log("updateBoardContext: Updating board context.")
      console.log("updateBoardContext: getting updated board.")
      const updatedBoard = await getUpdatedBoard();
      console.log("updateBoardContext: recived board:"); console.log(updatedBoard);
      if(!updatedBoard || updatedBoard === noBoardBoard) {
        console.log("updateBoardContext: no (real) board recived. Setting loaded to false and board to noBoardBoard")
        setLoaded(false);
        setCurrentBoard(noBoardBoard);
        return;
      }
      console.log("updateBoardContext: about to set current player")
      if (updatedBoard?.currentPlayerDto) 
        updatedBoard.playerDtos.forEach((player, index) => {
          if (player.playerId === updatedBoard.currentPlayerDto?.playerId) setCurrentPlayerIndex(index); //:'( can't break out
        });
      else {
        console.log("updateBoardContext: updated board contains no current player; settning current player to " + NO_USER_USERID);
      }
      console.log("getUpdatedBoard: setting updatedBoard as current board.")
      setCurrentBoard(updatedBoard)
      console.log("About to set loaded true.")
      setLoaded(true);
      console.log("Loaded should now be true. Value of loaded: " + loaded)
    };

    return (
        <BoardContext.Provider
          value={ {
            loaded: loaded,
            setLoaded: setLoaded,
            board: currentBoard,
            switchCurrentPlayer: switchToNextPlayer,
            setCurrentPlayerOnSpace: setPlayerOnSpace,
            updateBoardContext: updateBoardContext,
            setCurrentBoard: setCurrentBoard
            } }
        >
          {children}
        </BoardContext.Provider>
      );
}



export default BoardContextProvider