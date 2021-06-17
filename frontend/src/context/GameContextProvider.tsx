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
import { Game, NO_GAME_GAMEID } from "../types/Game";
import { User } from "../types/User";
import useCookie from "react-use-cookie";

type GameContextProviderPropsType = {
  children: ReactNode;
};

const GameContextProvider = ({ children }: GameContextProviderPropsType) => {
  const [userToken, setUserToken] = useCookie("user");
  //const [lastGameToken, setLastGameToken] = useCookie("last-game");

  const [currentGame, setCurrentGame] = useState<Game>({
    gameId: 0,
    name: "No game loaded",
    started: false,
    users: [],
  });
  const [games, setGames] = useState<Game[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentBoard, setCurrentBoard] = useState<Board>({
    playerDtos: [],
    spaceDtos: [],
    gameId: -1,
    boardName: "",
    currentPlayerDto: undefined,
    height: 0,
    width: 0,
  });
  const playerCount = useMemo(
    () => (currentBoard.playerDtos ? currentBoard.playerDtos.length : 0),
    [currentBoard.playerDtos]
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const getCurrentUser = async () => {
    if (userToken === undefined) {
      await createUser();
    } else {
      try {
        const fetched = (await GameApi.getUser(parseInt(userToken))).data;
        setCurrentUser(fetched);
      } catch (error) {
        await createUser();
      }
    }
  };

  const createUser = async () => {
    const user = (await GameApi.createUser()).data;
    setUserToken(user + "");

    const fetched = (await GameApi.getUser(user)).data;
    setCurrentUser(fetched);
  };

  useEffect(() => {
    getCurrentUser();

    return () => {};
  }, []);

  const updateGameContextGamesList = () =>
    GameApi.getGames()
      .then((gamesResponse) => {
        const games = gamesResponse.data;
        setGames(games);
      })
      .catch(() => {
        //console.error("Error while fetching all games from backend");
      });

  const updateGameContextGame = (gameId: number) => {
    if (gameId === NO_GAME_GAMEID) {
      setCurrentGame({
        gameId: NO_GAME_GAMEID,
        name: "No current game",
        started: false,
        users: [],
      });
      return;
    }

    GameApi.getGame(gameId)
      .then((game) => {
        setCurrentGame(game.data);
      })
      .catch((error) => {
        setLoaded(false);
        setCurrentGame({
          gameId: NO_GAME_GAMEID,
          name: "No current game",
          started: false,
          users: [],
        });
        console.error(error);
      });
  };

  const updateGameContextBoard = () => {
    if (currentGame.gameId === NO_GAME_GAMEID) {
      setLoaded(false);
      setCurrentBoard({
        playerDtos: [],
        spaceDtos: [],
        gameId: NO_GAME_GAMEID,
        boardName: "",
        currentPlayerDto: undefined,
        height: 0,
        width: 0,
      });
      return;
    }
    GameApi.getBoard(currentGame.gameId)
      .then((result) => {
        let updatedBoard = currentBoard;
        const board = result.data;
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
        console.log(updatedBoard);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(false);
        setCurrentBoard({
          playerDtos: [],
          spaceDtos: [],
          gameId: NO_GAME_GAMEID,
          boardName: "",
          currentPlayerDto: undefined,
          height: 0,
          width: 0,
        });
      });
  };

  const updateGameContext = (id: number) => {
    updateGameContextGamesList();
    updateGameContextGame(id);
    updateGameContextBoard();

    //  console.log(currentGame)
    //  console.log(currentBoard)
    //  console.log(currentUser)
  };

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    /*if (!currentGame) {
      updateGameContext(0);
    }*/
    const intervalId = setInterval(() => {
      if (currentUser) {
        updateGameContext(currentUser.currentGame);
      } else {
        updateGameContext(0);
      }
    }, 200);
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
      if(currentBoard.currentPlayerDto?.playerName !== currentUser?.userName)
      return
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
          forceViewUpdate()
          setLoaded(true);
          forceViewUpdate();
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

  const unselectGame = async () => {
    if (!currentGame || !currentUser) return;

    const usr = currentUser;
    usr.currentGame = NO_GAME_GAMEID;
    setCurrentUser(usr);

    try {
      GameApi.leaveGame(currentGame.gameId, currentUser.userId).catch(
        (err) => {}
      );
      setCurrentGame({
        gameId: NO_GAME_GAMEID,
        name: "No game loaded",
        started: false,
        users: [],
      });
      setCurrentBoard({
        playerDtos: [],
        spaceDtos: [],
        gameId: NO_GAME_GAMEID,
        boardName: "",
        currentPlayerDto: undefined,
        height: 0,
        width: 0,
      });
      forceViewUpdate();
      setLoaded(false);
    } catch (error) {
      return;
    }
  };

  const forceViewUpdate = () => {
    if (!currentUser) return;
    updateGameContext(currentUser.currentGame);
  };

  const createGame = async () => {
    const gameId = (await GameApi.createGame()).data;
    forceViewUpdate();
    return gameId;
  };

  const selectGame = async (gameId: number) => {
    if (!currentUser) return;
    try {
      await GameApi.joinGame(gameId, currentUser!.userId);
    } catch (e) {
      console.error(e);
      return;
    }
    const usr = currentUser;
    usr.currentGame = gameId;
    setCurrentUser(usr);
    let game: Game;
    try {
      game = (await GameApi.getGame(gameId)).data;
      setCurrentGame(game);
    } catch (e) {
      console.error(e);
    }
    forceViewUpdate();
  };

  const deleteGame = async (gameid: number) => {
    if (!currentUser) return;

    if (currentGame) {
      if (currentGame.gameId === gameid) unselectGame();
    }
    GameApi.removeGame(gameid).catch((err) => {});
    forceViewUpdate(); //suboptimal: this is called twice here and in unselectGame
  };

  return (
    <GameContext.Provider
      value={{
        games: games,
        selectGame: selectGame,
        unselectGame: unselectGame,
        deleteGame: deleteGame,
        loaded: loaded,
        board: currentBoard,
        currentGame: currentGame,
        currentUser: currentUser!,
        setCurrentPlayerOnSpace: setPlayerOnSpace,
        switchCurrentPlayer: switchToNextPlayer,
        forceViewUpdate: forceViewUpdate,
        createGame: createGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
