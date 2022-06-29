import React, {SyntheticEvent, useContext, useState} from 'react';
import './LoginForm.scss'
import {UserContext} from "../../context/UserContext";



export const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setUserToken} = useContext(UserContext)


    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault()
        const userInfo = await fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'haslo@o2.pl',
                password: '12345'
            })
        })
        const token = await userInfo.json()

        localStorage.setItem('noob_team_user', token.accessToken);
        setUserToken(token.accessToken);
    };

    return (
        <div className="loginForm">
            <p>Login to check stats, or add characters</p>
            <form onSubmit={handleLogin}>
                <h3>Login</h3>
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