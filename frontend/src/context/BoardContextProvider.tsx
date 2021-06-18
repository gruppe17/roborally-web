import { ReactNode, useMemo, useState, useContext } from "react";
import { Board, noBoardBoard } from '../types/Board';
import { Game, NO_GAME_GAMEID } from "../types/Game";
import BoardContext from "./BoardContext";
import GameApi from '../api/GameApi';
import UserContext from './UserContext';
import { Space } from "../types/Space";
import { forEach } from "cypress/types/lodash";

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
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

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


    const getUpdatedBoard = () => {
      if (currentUser.currentGameId === NO_GAME_GAMEID) 
        return noBoardBoard

      GameApi.getBoard(currentUser.currentGameId).then((result) => {
        const fetchedBoard = result.data
        let updatedBord = currentBoard
        updatedBord.spaceDtos = fetchedBoard.spaceDtos
        updatedBord.playerDtos = fetchedBoard.playerDtos
        updatedBord.width = fetchedBoard.width
        updatedBord.height = fetchedBoard.height

        if (!fetchedBoard.currentPlayerDto) 
          updatedBord.currentPlayerDto = fetchedBoard.currentPlayerDto

        return updatedBord;
      }).catch(() => {return noBoardBoard})
    }
    


    const updateBoardContext = () => {
        const updatedBoard = getUpdatedBoard();
        if(!updatedBoard || updatedBoard === noBoardBoard) {
          setLoaded(false);
          setCurrentBoard(noBoardBoard);
          return;
        }

        if (updatedBoard?.currentPlayerDto) 
          updatedBoard.playerDtos.forEach((player, index) => {
            if (player.playerId === updatedBoard.currentPlayerDto?.playerId) setCurrentPlayerIndex(index); //:'( can't break out
          });
        setCurrentBoard(updatedBoard)
        setLoaded(true);
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