import { createContext, Dispatch, SetStateAction } from "react"
import { Board, noBoardBoard } from '../types/Board';
import { Game, NO_GAME_GAMEID } from "../types/Game";
import { Space } from "../types/Space";

export type BoardContextType = {
    loaded : boolean,
    setLoaded : Dispatch<SetStateAction<boolean>>,
    board: Board,
    switchCurrentPlayer: () => Promise<void>,
    setCurrentPlayerOnSpace: (space: Space) => Promise<void>,
    updateBoardContext: () => void,
    setCurrentBoard: React.Dispatch<React.SetStateAction<Board>>,
}

const BoardContext = createContext<BoardContextType>({
    loaded : false,
    setLoaded : () => {},
    board: noBoardBoard,
    switchCurrentPlayer: async () => {},
    setCurrentPlayerOnSpace: async () => {},
    updateBoardContext: () => {},
    setCurrentBoard: () => {}
})

export default BoardContext