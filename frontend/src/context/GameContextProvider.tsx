/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  useState,
  useContext,
} from "react";
import GameContext from "./GameContext";
//import { Board, noBoardBoard } from '../types/Board';
import GameApi from "../api/GameApi";
import { Game, NO_GAME_GAME, NO_GAME_GAMEID } from '../types/Game';
import ReactInterval from "react-interval";
import UserContext from "./UserContext";
import BoardContext from './BoardContext';

type GameContextProviderPropsType = {
  children: ReactNode;
};


const GameContextProvider = ({ children }: GameContextProviderPropsType) => {
  //const [lastGameToken, setLastGameToken] = useCookie("last-game");
  const {currentUser, setCurrentUserGameId} = useContext(UserContext)
  const {updateBoardContext, setLoaded} = useContext(BoardContext)

  const [currentGame, setCurrentGame] = useState<Game>(NO_GAME_GAME);
  const [games, setGames] = useState<Game[]>([]);

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
      setCurrentGame(NO_GAME_GAME);
      return;
    }

    GameApi.getGame(gameId)
      .then((game) => {
        setCurrentGame(game.data);
      })
      .catch((error) => {
        setLoaded(false);
        setCurrentGame(NO_GAME_GAME);
        console.error(error);
      });
  };



  const updateGameContext = (id: number) => {
    updateGameContextGamesList();
    updateGameContextGame(id);
  };

  const unselectGame = async () => {
    if (!currentGame || !currentUser) return;

    await setCurrentUserGameId(NO_GAME_GAMEID)

    try {
      GameApi.leaveGame(currentGame.gameId, currentUser.userId).catch(
        (err) => {}
      );
      setCurrentGame(NO_GAME_GAME);
      forceViewUpdate();
      setLoaded(false); //Unnecessary?
    } catch (error) {
      return;
    }
  };

  const forceViewUpdate = () => {
    if (!currentUser) {
      return;
    }
    updateGameContext(currentUser.currentGameId);
    updateBoardContext();
  };

  const createGame = async () => {
    const gameId = (await GameApi.createGame()).data;
    forceViewUpdate();
    return gameId;
  };

  const selectGame = async (gameId: number) => {
    if (!currentUser) return;
    
    try {
      await GameApi.joinGame(gameId, currentUser.userId);
    } catch (e) {
      console.error(e);
      return;
    }
    await setCurrentUserGameId(gameId)
    let game: Game;
    try {
      game = (await GameApi.getGame(gameId)).data;
      setCurrentGame(game);
    } catch (e) {
      console.error(e);
    }
    forceViewUpdate();
  }

  const deleteGame = async (gameid: number) => {
    if (!currentUser) return;

    if (currentGame) {
      if (currentGame.gameId === gameid) unselectGame();
    }
    GameApi.removeGame(gameid).catch((err) => {});
    forceViewUpdate(); //suboptimal: this is called twice here and in unselectGame
  }; 

  const changeGameName = async (gameId: number, name: string) => {
    if (name !== "") return (await GameApi.editGameName(gameId, name)).data;
    return false;
  };

  const startGame = async (gameId: number) => {
      return (await GameApi.startGame(gameId)).data;
  };

  return (
    <GameContext.Provider
      value={{
        games: games,
        currentGame: currentGame,
        selectGame: selectGame,
        unselectGame: unselectGame,
        createGame: createGame,
        deleteGame: deleteGame,
        startGame: startGame,
        changeGameName: changeGameName,
        forceViewUpdate: forceViewUpdate,
      }}
    >
      <ReactInterval enabled={true} timeout={1000} callback= {() => forceViewUpdate()}/>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
