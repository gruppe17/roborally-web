import  {User} from "./User"

export const NO_GAME_GAMEID = -1;

export const NO_GAME_GAME : Game = {
    gameId: NO_GAME_GAMEID,
    name: "No current game",
    started: false,
    users: [],
}

export type Game = {
    gameId : number,
    name : string,
    started : boolean,
    users : User[]
}