import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {User} from "./components/User/User";
import {Characters} from "./components/Characters/Characters";
import {UserContext} from './context/UserContext';

export const App = () => {
    const [userToken, setUserToken] = useState<undefined | string>(undefined);

    useEffect(() => {
        const user = localStorage.getItem('noob_team_user');
        if (user) {
            setUserToken(user);
        }
        console.log('user to', user)
    }, []);

    const logoutUser = () => {
        localStorage.removeItem('noob_team_user');
        setUserToken('')
    };

    return (
        <>
            <UserContext.Provider value={{userToken, setUserToken}}>
                <Navbar/>
                {userToken ?
                    <button onClick={logoutUser}> LOG OUT</button> : <Characters/>
                }
                <Routes>
                    <Route path="/user" element={<User/>}/>
                </Routes>
            </UserContext.Provider>
        </>
    )
}
