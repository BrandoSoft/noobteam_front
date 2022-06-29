import {createContext} from "react";

export const UserContext = createContext({
    userToken: undefined,
    setUserToken: (s:string) => {},
    userName: undefined,
    setUserName: (s: string)=>{},
    userId: undefined,
    setUserId: (s: string)=>{},
    })