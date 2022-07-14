import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {Characters} from "./components/Characters/Characters";
import { useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {setIsLoggedIn, setUserToken} from './redux/actions/user';
import {RegisterForm} from "./components/Forms/RegisterForm";
import {User} from "./components/User/User";

import './App.scss'


export const App = () => {
    const {} = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem('noob_team_user');
        if (user) {
            dispatch(setUserToken(user));
        }
    }, []);

    return (
        <>
                <Navbar/>
                <div className="container">
                <Routes>
                        <Route path="/" element={<Characters/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                </Routes>
                </div>
        </>
    )
}
