import React, {
    ReactNode, useState, useEffect,
} from "react";
import useCookie from "react-use-cookie";
import { User } from "../types/User";
import GameApi from "../api/GameApi";
import UserContext from "./UserContext";

type UserContextProviderPropsType = {
    children : ReactNode
}

const UserContextProvider = ({ children } : UserContextProviderPropsType) => {
    const [userToken, setUserToken] = useCookie("user");
    const [currentUser, setCurrentUser] = useState<User>();

    const getCurrentUser = async () => {
        if (userToken === undefined) {
            await createUser();
        } else {
            try {
            const fetched = (await GameApi.getUser(parseInt(userToken))).data;
            setCurrentUser(fetched);
            } catch (error) {
            await createUser();
            }
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
        getCurrentUser();
        return () => {};
    }, []);
*/

    return (
        <UserContext.Provider
          value={ {
              currentUser: currentUser!, 
              setCurrentUser: setCurrentUser,
              getCurrentUser: getCurrentUser
            } }
        >
        </UserContext.Provider>
      );
}

export default UserContextProvider