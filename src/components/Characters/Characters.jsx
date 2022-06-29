import React, { useContext, useEffect, useState } from 'react';
import { AddCharacter } from "../AddCharacter/AddCharacter";
import { UserContext } from "../../context/UserContext";


export const Characters = () => {

    const {userToken,setUserToken, userName} = useContext(UserContext)

    const [characters, setCharacters] =useState([])

    const logoutUser = () => {
        localStorage.removeItem('noob_team_user');
        setUserToken('')
    };

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/characters/94e8503e-2097-4b59-bd3f-c1ff1eaa4f0c',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userToken,
                    },
                }
                );
            console.log('res',res)
            setCharacters(await res.json())
            console.log(characters)
        })()
    }, []);



    return (
        <div>
            <button onClick={logoutUser}> LOG OUT</button>
            <h2>Witaj {userName}: Lista Postaci które obserwujesz:</h2>
            <p>Komponent z mapa postaci {characters.map(e=> <p>{e.name}</p>)}</p>
            <AddCharacter/>
        </div>
    );
};
