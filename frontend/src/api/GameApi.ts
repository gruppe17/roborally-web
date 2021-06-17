import axios from "axios";
import { Board } from "../types/Board";
import { Game } from "../types/Game";
import { Space } from "../types/Space";
import { User } from "../types/User";


class GameApi {
    

    private static instance: GameApi;
    private readonly BACKEND_URL = "http://localhost:8080" // "https://roborally-backend.herokuapp.com" //    "https://roborallyserver.tobiasmaneschijn.com/"
    private constructor() { }

    public static getInstance(): GameApi {
        if (!GameApi.instance) {
            GameApi.instance = new GameApi();
        }
        return GameApi.instance;
    }

    public async getBoard(gameId : number) {
        return axios.get<Board>(`${this.BACKEND_URL}/game/get/${gameId}/board`)
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
        return await axios.post<number>(`${this.BACKEND_URL}/game/new`)
    }


    public async getGame(gameId : number) {
        return await axios.get<Game>(`${this.BACKEND_URL}/game/get/${gameId}`)
    }

    public async joinGame(gameId: number, userId : number)  {

        return await axios.post(`${this.BACKEND_URL}/game/join/${gameId}/${userId}`)
    }

    public async leaveGame (gameId : number, userId : number) {
        return await axios.put(`${this.BACKEND_URL}/game/leave/${gameId}/${userId}`, {})
    }

    public async editGameName(gameId: number, title: string) {
        return await axios.put<boolean>(`${this.BACKEND_URL}/game/get/${gameId}/edit/${title}`)
    }

    // Should return a boolean or an error message from the backend 
    public async removeGame(gameId: number) {
        return await axios.delete(`${this.BACKEND_URL}/game/get/${gameId}/remove`)
    }


    public async getAllUsers() {
        return await axios.get<User[]>(`${this.BACKEND_URL}/user/all`);
    }

    public async createUser() {
        return await axios.post<number>(`${this.BACKEND_URL}/user/new`)
    }


    public async getUser(userId : number) {
        return await axios.get<User>(`${this.BACKEND_URL}/user/get/${userId}`)
    }

    public async removeUser(userId : number) {
        return await axios.delete(`${this.BACKEND_URL}/user/get/${userId}/remove`)
    }


    public async createBoard(gameId: number, name: String, height: number, width: Number) {

        const board = {
            "gameId": gameId,
            "boardName": name,
            "height": height,
            "width": width,
        }
        return await axios.post(`${this.BACKEND_URL}/game/get/${gameId}/board/new`, board)
    }


    public moveCurrentPlayer(gameId: number, space: Space) {
        return axios.put(`${this.BACKEND_URL}/game/get/${gameId}/board/move`, space)
    }

    public switchPlayer(gameId: number) {
        return axios.put(`${this.BACKEND_URL}/game/get/${gameId}/board/switchplayer`)
    }
}

export default GameApi.getInstance()