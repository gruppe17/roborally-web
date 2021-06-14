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
        return await axios.get<Game[]>(`${this.BACKEND_URL}/game/all`)
    }

    public async createGame() {
        return await axios.post<Number>(`${this.BACKEND_URL}/game/new`)
    }

    public async getGame(gameId : Number) {
        return await axios.get<Game>(`${this.BACKEND_URL}/game/get/${gameId}`)
    }

    public async joinGame(gameId: number, user : User)  {
        return await axios.put(`${this.BACKEND_URL}/game/${gameId}/join/${user.userId}`)
    }

    public async leaveGame (user : User) : Promise<Boolean>{
        return await true;
    }

    public async editGameName(gameId : number, title: string){
       // return await axios.put(`${this.BACKEND_URL}/games/`)
    }

    // Should return a boolean or an error message from the backend 
    public async removeGame(gameId : number) {
        return await axios.delete(`${this.BACKEND_URL}/game/get/${gameId}/remove`)
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