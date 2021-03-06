import { ReactNode, useMemo, useState, useContext } from "react";
import { Board, noBoardBoard } from "../types/Board";
import { NO_GAME_GAMEID } from "../types/Game";
import BoardContext from "./BoardContext";
import GameApi from "../api/GameApi";
import UserContext from "./UserContext";
import { Space } from "../types/Space";
import { NO_USER_USERID } from "../types/User";
import _ from "lodash";

type BoardContextProviderPropsType = {
  children: ReactNode;
};

const BoardContextProvider = ({ children }: BoardContextProviderPropsType) => {
  const { currentUser } = useContext(UserContext);

  const [canMove, setCanMove] = useState<boolean>(true);

  const [loaded, setLoaded] = useState<boolean>(false);
  
  const [currentBoard, setCurrentBoard] = useState<Board>(_.cloneDeep(noBoardBoard));
  const playerCount = useMemo(
    () => (currentBoard.playerDtos ? currentBoard.playerDtos.length : 0),
    [currentBoard.playerDtos]
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(NO_USER_USERID);

  const switchToNextPlayer = async () => {
    if (!currentBoard || !playerCount) return;
    if (currentBoard.currentPlayerDto?.playerId !== currentUser?.userId) return;
    setCanMove(false);
    await GameApi.switchPlayer(currentUser.currentGameId)
      .then(() => {
        setCanMove(true);
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
    setCanMove(false);
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
    if (currentUser.currentGameId === NO_GAME_GAMEID) return _.cloneDeep(noBoardBoard);

    const fetchedBoard = (await GameApi.getBoard(currentUser.currentGameId))
      .data;
    let updatedBord = currentBoard;
    updatedBord.boardName = fetchedBoard.boardName;
    updatedBord.gameId = fetchedBoard.gameId; //Why does board have a game id? We only ever display one at a time
    updatedBord.spaceDtos = fetchedBoard.spaceDtos;
    updatedBord.playerDtos = fetchedBoard.playerDtos;
    updatedBord.width = fetchedBoard.width;
    updatedBord.height = fetchedBoard.height;
    updatedBord.currentPlayerDto = fetchedBoard.currentPlayerDto;
    return updatedBord;
  };

  const updateBoardContext = async () => {
    const updatedBoard = await getUpdatedBoard();
    if (!updatedBoard || updatedBoard.gameId === NO_GAME_GAMEID) {
      setLoaded(false);
      setCurrentBoard(_.cloneDeep(noBoardBoard));
      return;
    }
    if (updatedBoard?.currentPlayerDto)
      updatedBoard.playerDtos.forEach((player, index) => {
        if (player.playerId === updatedBoard.currentPlayerDto?.playerId)
          setCurrentPlayerIndex(index); //:'( can't break out
      });
    setCurrentBoard(updatedBoard);
    setLoaded(true);
  };

  return (
    <BoardContext.Provider
      value={{
        loaded: loaded,
        canMove: canMove,
        setLoaded: setLoaded,
        board: currentBoard,
        switchCurrentPlayer: switchToNextPlayer,
        setCurrentPlayerOnSpace: setPlayerOnSpace,
        updateBoardContext: updateBoardContext,
        setCurrentBoard: setCurrentBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
