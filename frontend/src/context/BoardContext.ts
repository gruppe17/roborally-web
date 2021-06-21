import _ from "lodash";
import { createContext, Dispatch, SetStateAction } from "react"
import { Board, noBoardBoard } from '../types/Board';
import { Space } from "../types/Space";

export type BoardContextType = {
    loaded : boolean,
    canMove : boolean,
    setLoaded : Dispatch<SetStateAction<boolean>>,
    board: Board,
    switchCurrentPlayer: () => Promise<void>,
    setCurrentPlayerOnSpace: (space: Space) => Promise<void>,
    updateBoardContext: () => void,
    setCurrentBoard: React.Dispatch<React.SetStateAction<Board>>,
}

const BoardContext = createContext<BoardContextType>({
    loaded : false,
    canMove : false,
    setLoaded : () => {},
    board: _.cloneDeep(noBoardBoard),
    switchCurrentPlayer: async () => {},
    setCurrentPlayerOnSpace: async () => {},
    updateBoardContext: () => {},
    setCurrentBoard: () => {}
})

export default BoardContext