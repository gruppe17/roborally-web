import React, {
    ReactNode, useState,
} from "react";
import useCookie from "react-use-cookie";
import { User } from "../types/User";
import GameApi from "../api/GameApi";
import UserContext from "./UserContext";
import FetchCurrentUserComponent from "../components/FetchUserComponent";

type UserContextProviderPropsType = {
    children : ReactNode
}

const UserContextProvider = ({ children } : UserContextProviderPropsType) => {
    const [userToken, setUserToken] = useCookie("user");
    const [currentUser, setCurrentUser] = useState<User>();

    const fetchCurrentUser = async () => {
        console.log("Fetching User")
        if (userToken === undefined) {
            await createUser();
        } 

        try {
            const fetched = (await GameApi.getUser(parseInt(userToken))).data;
            setCurrentUser(fetched);
        } catch (error) {
            await createUser();
        }
    };

    const createUser = async () => {
        const user = (await GameApi.createUser()).data;
        setUserToken(user + "");

        const fetched = (await GameApi.getUser(user)).data;
        setCurrentUser(fetched);
    };
/*
    useEffect(() => {
        fetchCurrentUser();
        return () => {};
    }, []);
*/
    const setCurrentUserGameId = async (gameId : number) => {
        if (!currentUser) await fetchCurrentUser();
        if (!currentUser) throw new Error("No current user");
        currentUser.currentGameId = gameId;
        setCurrentUser(currentUser); //Is this necessary?
    }

    return (
        <UserContext.Provider
          value={ {
              currentUser: currentUser!, 
              fetchCurrentUser: fetchCurrentUser,
              setCurrentUserGameId: setCurrentUserGameId,
            } }
        >
            <FetchCurrentUserComponent/>
            {children}
        </UserContext.Provider>
      );
}

export default UserContextProvider