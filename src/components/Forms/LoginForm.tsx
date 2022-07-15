import React, {SyntheticEvent, useContext, useState} from 'react';
import './Forms.scss'
import {useDispatch, useSelector} from "react-redux";
import {setErrorMsg, setIsLoggedIn, setUserId, setUserName, setUserToken} from "../../redux/actions/user";
import {RootState} from "../../redux/store";
import {Link, useNavigate} from 'react-router-dom';

import { BiCommentError } from 'react-icons/bi';

export const LoginForm = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const {isLoggedIn, userName, errorMsg} = useSelector((store: RootState) => store.user)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const userInfo = await response.json();
        console.log(userInfo.userId)

        if (response.status === 200) {
            localStorage.setItem('noob_team_user', userInfo.accessToken);
            dispatch(setUserToken(userInfo.accessToken));
            dispatch(setUserName(userInfo.name));
            dispatch(setIsLoggedIn(true));
            dispatch(setUserId(userInfo.userId))

            navigate('/', {replace: true})
        }
        if (response.status !== 200) {
            dispatch(setErrorMsg(userInfo.errors[0].msg))
        }
    };

    const handleLoginTestUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@test.pl',
                password: '12345'
            })
        })

        const userInfo = await response.json();

        if (response.status === 200) {
            localStorage.setItem('noob_team_user', userInfo.accessToken);
            dispatch(setUserToken(userInfo.accessToken));
            dispatch(setUserName(userInfo.name));
            dispatch(setIsLoggedIn(true));
            dispatch(setUserId(userInfo.userId))

            navigate('/', {replace: true})
        }
        if (response.status !== 200) {
            dispatch(setErrorMsg(userInfo.errors[0].msg))
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('noob_team_user');
        dispatch(setUserToken(''))
        dispatch(setIsLoggedIn(false))
        dispatch(setErrorMsg(''))
    };

    if (isLoggedIn) {
        return <button onClick={logoutUser} className="login test">Wyloguj {userName} </button>
    }

    return (
        <>
            <button onClick={handleLoginTestUser} className="login test"> Zaloguj na konto testowe</button>
            {errorMsg && <div className="error">
               <BiCommentError className="error__icon"/>
                <div className="error__message">{errorMsg}</div></div>}

            <div className="loginForm">
                <div className="loginForm__form">
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="login">Zaloguj</button>
                    </form>
                    <Link to="/register" className="register"> Rejestracja</Link>
                </div>
            </div>
        </>
    );
};
