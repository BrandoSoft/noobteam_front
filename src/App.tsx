import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {User} from "./components/User/User";
import {Characters} from "./components/Characters/Characters";
import {UserContext} from './context/UserContext';
import {LoginForm} from "./components/LoginForm/LoginForm";

export const App = () => {
    const [userToken, setUserToken] = useState<undefined | string>(undefined);
    const [userName, setUserName] = useState<undefined | string>(undefined);
    const [userId, setUserId] = useState<undefined | string>(undefined);

    useEffect(() => {
        const user = localStorage.getItem('noob_team_user');
        if (user) {
            setUserToken(user);
        }
        console.log('user to', user)
    }, []);



    return (
        <>
            <UserContext.Provider value={{userToken, setUserToken, userName, setUserName, userId, setUserId}}>
                <Navbar/>
                {!userToken ? <LoginForm/> : <Characters/>
                }
                <Routes>
                    <Route path="/user" element={<User/>}/>
                </Routes>
            </UserContext.Provider>
        </>
    )
}
