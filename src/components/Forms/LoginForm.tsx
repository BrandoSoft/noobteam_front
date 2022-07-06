import React, {SyntheticEvent, useContext, useState} from 'react';
import './Forms.scss'
import {useDispatch, useSelector} from "react-redux";
import {setErrorMsg, setIsLoggedIn, setUserName, setUserToken} from "../../redux/actions/user";
import {RootState} from "../../redux/store";


export const LoginForm = () => {

    const dispatch = useDispatch();
    const {isLoggedIn, userName, errorMsg} = useSelector((store: RootState) => store.user)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3001/user/login', {
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

        if (response.status === 200) {
            console.log('status to 200')
            localStorage.setItem('noob_team_user', userInfo.accessToken);
            dispatch(setUserToken(userInfo.accessToken));
            dispatch(setUserName(userInfo.name));
            dispatch(setIsLoggedIn(true))
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
        return <button onClick={logoutUser}> Wyloguj {userName}</button>
    }

    return (
        <div className="loginForm">
            {errorMsg && <div>{errorMsg}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};
