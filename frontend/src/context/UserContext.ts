import { NO_USER_USERID, User } from '../types/User';
import { createContext } from 'react';
import {NO_GAME_GAMEID } from "../types/Game";

export type UserContextType = {
    currentUser : User,
    getCurrentUser: () => Promise<void>,
    setCurrentUserGameId : (gameId : number) => Promise<void>,
}

const UserContext = createContext<UserContextType>({
    currentUser: {
        userId: NO_USER_USERID,
        userName: "Not logged in!",
        currentGameId: NO_GAME_GAMEID
    },
    getCurrentUser: async () => {},
    setCurrentUserGameId : async (gameId : number) => {}
})

export default UserContext