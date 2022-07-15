import React, {SyntheticEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useNavigate} from "react-router-dom";

export const RegisterForm = () => {
    let navigate = useNavigate();



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<any[]>([]);


    const handleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        const registerUser = await fetch(`${process.env.REACT_APP_BACKEND}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })

        const response = await registerUser.json()

        if (registerUser.status === 200) {
            setName('');
            setEmail('');
            setPassword('');
            setError([]);

            navigate('/', {replace: true})
        }

        if (registerUser.status !== 200) {
         setError(response.errors)
        }
    };

    return (
        <div>
            <div className="loginForm">
                <p>Login to check stats, or add characters</p>
                <form onSubmit={handleRegister}>
                    <h3>Register</h3>

                    <input
                        type="name"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                    <input
                        type="password2"
                        placeholder="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <button type="submit">Register</button>
                </form>
                {error.length > 0 ? <div>{error.map(e => <p key={e.msg}>{e.msg}</p>)}</div> : null}
            </div>
        </div>
    );
};

// @TODO Add front validation + password validation