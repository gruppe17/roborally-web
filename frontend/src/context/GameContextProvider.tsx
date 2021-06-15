import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import GameContext from "./GameContext";
import { Player } from "../types/Player";
import { Board } from "../types/Board";
import { Space } from "../types/Space";
import GameApi from "../api/GameApi";
import { Game } from "../types/Game";
import { User } from "../types/User";

type GameContextProviderPropsType = {
  children: ReactNode;
};

const GameContextProvider = ({ children }: GameContextProviderPropsType) => {
  const updateGameContext = (boardId: number) =>
    updateGameContextBoard(boardId);

  const updateGameContextGamesList = () =>
    GameApi.getGames()
      .then((gamesResponse) => {
        const games = gamesResponse.data;
        setGames(games);
        setLoaded(true);
      })
      .catch(() => {
        console.error("Error while fetching board from backend");
      });

  const updateGameContextBoard = (boardId: number) =>
    GameApi.getBoard(boardId)
      .then((board) => {

        let updatedBoard = currentBoard!
        updatedBoard.spaceDtos = board.spaceDtos
        updatedBoard.playerDtos = board.playerDtos
        updatedBoard.width = board.width
        updatedBoard.height = board.height

        if (board.currentPlayerDto) {
        updatedBoard.currentPlayerDto = board.currentPlayerDto
          board.playerDtos.forEach((player, index) => {
            if (player.playerId === board.currentPlayerDto?.playerId) {
              setCurrentPlayerIndex(index);
            }
          });
        }
        setCurrentBoard(updatedBoard)

        setLoaded(true);
      })
      .catch(() => {
        console.error("Error while fetching board from backend");
      });

  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    updateGameContextGamesList();
  }, []);
  //The code below is executed when the provider is rendered (inside App.tsx)
  //The code should fetch the data from the API instead of using a static assignment
  //Define a useState variable, note that useState returns an array, containing that state itself aswell as
  // a function to set a new state value, here we use array destructuring (the [..., ...] notation).
  // we also declare that the state variable and setter should be of type /take type Player[]
  const [currentGame, setCurrentGame] = useState<Game>();
  const [games, setGames] = useState<Game[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentBoard, setCurrentBoard] = useState<Board>();
  const playerCount = useMemo(
    () => currentBoard?.playerDtos.length,
    [currentBoard?.playerDtos]
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  //Define a function used to set a player ona  specific space
  const setPlayerOnSpace = useCallback(
    async (space: Space) => {
      if (!currentGame || !currentBoard) return;
      //Check if space already has a player standing on it
      if (space.playerId) return;
      await GameApi.moveCurrentPlayer(currentGame!.gameId, {
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
        })
        .catch(() => {
          console.error("Error while fetching board from backend");
        });
    },
    [currentBoard, currentGame]
  );

  const switchToNextPlayer = useCallback(async () => {
    if (!currentGame || !currentBoard || !playerCount) return;

    await GameApi.switchPlayer(currentGame.gameId)
      .then(() => {
        const newPlayerIndex = (currentPlayerIndex + 1) % playerCount;

        setCurrentPlayerIndex(newPlayerIndex);
      })
      .catch(() => console.error("Error while switching player"));
  }, [currentGame, currentBoard, currentPlayerIndex, playerCount]);

  const game = useMemo<Game>(() => {
    return {
      gameId: currentGame!.gameId,
      name: currentGame!.name,
      started: currentGame!.started,
      users: currentGame!.users,
    };
  }, [currentGame]);

  const user = useMemo<User>(() => {
    return {
    userId: currentUser!.userId,
    userName: currentUser!.userName
    };
  }, [currentGame]);

  const board = useMemo<Board>(() => {
    return {
      spaceDtos: currentBoard!.spaceDtos,
      playerDtos: currentBoard!.playerDtos,
      currentPlayerDto: currentBoard!.currentPlayerDto,
      currentPlayerIndex: currentPlayerIndex,
      width: currentBoard!.width,
      height: currentBoard!.height,
      boardName: currentBoard!.boardName,
      boardId: currentBoard!.boardId,
    };
  }, [currentBoard]);

  return (
    <GameContext.Provider
      value={{
        games: games,
        selectGame: async (gameId : number) => {
          GameApi.joinGame(gameId, currentUser!.userId)
          setCurrentGame((await GameApi.getGame(gameId)).data)
        },
        unselectGame: async () => {
          if(!currentGame || !currentUser)
          return
          GameApi.leaveGame(currentGame?.gameId, currentUser?.userId);
          setCurrentGame(undefined)
          setCurrentBoard(undefined)

        },
        loaded: loaded,
        board: board,
        currentGame: game,
        currentUser: user,
        setCurrentPlayerOnSpace: setPlayerOnSpace,
        switchCurrentPlayer: switchToNextPlayer,
      }}
    >
      {children}{" "}
      {/*See: https://reactjs.org/docs/composition-vs-inheritance.html*/}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
