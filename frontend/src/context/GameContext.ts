import {createContext} from "react";
import {Board} from "../types/Board";
import { Game } from "../types/Game";
import {Space} from "../types/Space";
import { User } from "../types/User";

export type GameContextType = {
    // Information about games
    games: Game[]
    selectGame: (gameId: number) => Promise<void>,
    unselectGame: () => Promise<void>,
    currentUser : User,
    currentGame : Game,
    deleteGame :  (gameId: number) => Promise<void>,
    loaded : boolean,
    board: Board,
    setCurrentPlayerOnSpace: (space: Space) => Promise<void>,
    switchCurrentPlayer: () => Promise<void>,
    forceViewUpdate : () => Promise<void>
}
//Define a new context of type GameContextType
//Below we define the "default" values which are set upon initialization of the context

const GameContext = createContext<GameContextType>({
    games: [],
    currentGame: {
        gameId: 0,
        name: "No game loaded",
        started: false,
        users: []

    },
    currentUser: {
        userId: 0,
        userName: "Not logged in!",
        currentGame: 0
    },
    selectGame: async () => {},
    unselectGame: async () => {},
    deleteGame: async (gameId : number) => {},
    loaded : false,
    board: {
        playerDtos: [],
        spaceDtos: [],
        boardId: -1,
        boardName: "",
        currentPlayerDto: undefined,
        height: 0,
        width: 0
    },
    setCurrentPlayerOnSpace: async () => {
    },
    switchCurrentPlayer: async () => {
    },
    forceViewUpdate: async () => {}
});

export default GameContext