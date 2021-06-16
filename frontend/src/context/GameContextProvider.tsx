/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import GameContext from "./GameContext";
import { Board } from "../types/Board";
import { Space } from "../types/Space";
import GameApi from "../api/GameApi";
import { Game } from "../types/Game";
import { User } from "../types/User";
import useCookie from "react-use-cookie";

type GameContextProviderPropsType = {
  children: ReactNode;
};

const GameContextProvider = ({ children }: GameContextProviderPropsType) => {
  const [userToken, setUserToken] = useCookie("user");
  //const [lastGameToken, setLastGameToken] = useCookie("last-game");

  const [currentGame, setCurrentGame] = useState<Game>();
  const [games, setGames] = useState<Game[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentBoard, setCurrentBoard] = useState<Board>();
  const playerCount = useMemo(
    () => currentBoard?.playerDtos.length,
    [currentBoard?.playerDtos]
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

const getCurrentUser = async () => {
    if(userToken === undefined)
    {
      await createUser()
    }
    else{
      try {
      const fetched = (await GameApi.getUser(parseInt(userToken))).data;
      setCurrentUser(fetched)
      } catch (error) {
        await createUser()
      }
    }
}

const createUser = async () => {
  const user =  (await GameApi.createUser()).data
  setUserToken(user + '')

  const fetched = (await GameApi.getUser(user)).data;
  setCurrentUser(fetched)
} 

useEffect(() => {
    
      getCurrentUser()

  return () => {
    
  }
}, [])

  const updateGameContextGamesList = () =>
    GameApi.getGames()
      .then((gamesResponse) => {
        const games = gamesResponse.data;
        setGames(games);
      })
      .catch(() => {
        //console.error("Error while fetching all games from backend");
      });

  const updateGameContextGame = (gameId: number) =>
    GameApi.getGame(gameId)
      .then((game) => {
        setCurrentGame(game.data);
      })
      .catch((error) => {
        console.error("Error while fetching chosen game from backend");
        console.error(error);

      });

  const updateGameContext = (id: number) => {
    const updateGameContextBoard = (gameId: number) =>
      GameApi.getBoard(gameId)
        .then((board) => {
          let updatedBoard = currentBoard!;
          updatedBoard.spaceDtos = board.spaceDtos;
          updatedBoard.playerDtos = board.playerDtos;
          updatedBoard.width = board.width;
          updatedBoard.height = board.height;

          if (board.currentPlayerDto) {
            updatedBoard.currentPlayerDto = board.currentPlayerDto;
            board.playerDtos.forEach((player, index) => {
              if (player.playerId === board.currentPlayerDto?.playerId) {
                setCurrentPlayerIndex(index);
              }
            });
          }
          setCurrentBoard(updatedBoard);

          setLoaded(true);
        })
        .catch(() => {
          //console.error("Error while fetching board from backend");
        });

    updateGameContextGamesList();
    updateGameContextBoard(id);
    updateGameContextGame(id);
  };

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    /*if (!currentGame) {
      updateGameContext(0);
    }*/
    const intervalId = setInterval(() => {
      if (currentGame) {
        updateGameContext(currentGame.gameId);
      }else{
        updateGameContext(0);
      }
    }, 1500);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentGame, updateGameContext]);

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
          //console.error("Error while fetching board from backend");
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
    if (currentGame)
      return {
        gameId: currentGame.gameId,
        name: currentGame.name,
        started: currentGame.started,
        users: currentGame.users,
      };
    return {
      gameId: 0,
      name: "No game loaded",
      started: false,
      users: [],
    };
  }, [currentGame]);

  const user = useMemo<User>(() => {
    if (currentUser)
      return {
        userId: currentUser.userId,
        userName: currentUser.userName,
        currentGame: currentUser.currentGame
      };

    return {
      userId: 0,
      userName: "Not logged in!",
      currentGame: 0
    };
  }, [currentUser]);

  const board = useMemo<Board>(() => {
    if (currentBoard)
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

    return {
      playerDtos: [],
      spaceDtos: [],
      boardId: -1,
      boardName: "",
      currentPlayerDto: undefined,
      height: 0,
      width: 0,
    };
  }, [currentBoard, currentPlayerIndex]);

  return (
    <GameContext.Provider
      value={{
        games: games,
        selectGame: async (gameId: number) => {
          GameApi.joinGame(gameId, currentUser!.userId);
          setCurrentGame((await GameApi.getGame(gameId)).data);
        },
        unselectGame: async () => {
          if (!currentGame || !currentUser) return;
          GameApi.leaveGame(currentGame?.gameId, currentUser?.userId);
          setCurrentGame(undefined);
          setCurrentBoard(undefined);
        },
        loaded: loaded,
        board: board,
        currentGame: game,
        currentUser: user,
        setCurrentPlayerOnSpace: setPlayerOnSpace,
        switchCurrentPlayer: switchToNextPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
