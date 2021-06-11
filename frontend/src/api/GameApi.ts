import axios from "axios";
import { Board } from "../types/Board";
import { Game } from "../types/Game";
import { Space } from "../types/Space";
import { User } from "../types/User";

class GameApi {
    private static instance: GameApi;
    private readonly BACKEND_URL = "https://roborally-backend.herokuapp.com" // "https://roborallyserver.tobiasmaneschijn.com/"
    private constructor() { }

    public static getInstance(): GameApi {
        if (!GameApi.instance) {
            GameApi.instance = new GameApi();
        }
        return GameApi.instance;
    }

    public getBoard(boardId: number) {
        return axios.get<Board>(`${this.BACKEND_URL}/board/${boardId}`).then(value => value.data)
    }

    public async getBoards() {
        return await axios.get<Board[]>(`${this.BACKEND_URL}/boards`)
    }

    /**
     * Gets games from backend
     * @returns 
     */
    public async getGames() {
        return await axios.get<Game[]>(`${this.BACKEND_URL}/games`)
    }


    public async joinGame(gameId: number, user : User)  {
        // Not yet implemented
        return await axios.put(`${this.BACKEND_URL}/games/${gameId}/join/${user.userId}`)
    }

    public async leaveGame(user : User) {
        // Not yet implemented
        return null;
    }

    public async editGameName(gameId : string, title: string){
       // return await axios.put(`${this.BACKEND_URL}/games/`)
    }
    




    public async createBoard(name: String, height: Number, width: Number) {

        const board = {
            "boardId": 1,
            "boardName": name,
            "height": height,
            "width": width,
        }
        return await axios.post(`${this.BACKEND_URL}/board`, board)
    }


    public moveCurrentPlayer(boardId: number, space: Space) {
        return axios.put(`${this.BACKEND_URL}/board/${boardId}/move`, space)
    }

    public switchPlayer(boardId: number) {
        return axios.put(`${this.BACKEND_URL}/board/${boardId}/switchplayer`)
    }
}

export default GameApi.getInstance()