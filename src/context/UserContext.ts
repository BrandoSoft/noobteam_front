import {createContext} from "react";

export const UserContext = createContext({
    userToken: undefined,
    setUserToken: (s: string) => {
    },
})