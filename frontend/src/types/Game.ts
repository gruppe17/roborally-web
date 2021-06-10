import  {User} from "./User"

export type Game = {
    gameId : number,
    name : string,
    started : boolean,
    users : User[]
}