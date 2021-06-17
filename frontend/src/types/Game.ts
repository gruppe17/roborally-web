import  {User} from "./User"

export const NO_GAME_GAMEID = -1;

export type Game = {
    gameId : number,
    name : string,
    started : boolean,
    users : User[]
}