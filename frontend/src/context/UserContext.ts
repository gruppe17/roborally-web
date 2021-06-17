import { User } from "../types/User";
import { createContext } from 'react';
import {NO_GAME_GAMEID } from "../types/Game";

export type UserContextType = {
    currentUser : User,
    setCurrentUser : React.Dispatch<React.SetStateAction<User | undefined>>,
    getCurrentUser: () => Promise<void>,
}

const UserContext = createContext<UserContextType>({
    currentUser: {
        userId: 0,
        userName: "Not logged in!",
        currentGameId: NO_GAME_GAMEID
    },
    setCurrentUser : () => {},
    getCurrentUser: async () => {}
})

export default UserContext