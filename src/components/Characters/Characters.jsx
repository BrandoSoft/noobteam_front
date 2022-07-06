import React, { useEffect, useState } from 'react';
import { AddCharacter } from "../AddCharacter/AddCharacter";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from '../../redux/store'

export const Characters = () => {
    const dispatch = useDispatch();
    const {userToken, userName, isLoggedIn} = useSelector((store: RootState) => store.user)

    const [characters, setCharacters] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/characters/94e8503e-2097-4b59-bd3f-c1ff1eaa4f0c', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userToken,
                    },
                }
            );
            console.log('res', res)
            setCharacters(await res.json())
            console.log(characters)
        })()
    }, [userName]);

    if(isLoggedIn){
        return (
            <div>

                {
                    characters.length > 0 &&
                    <>
                        <h2>Witaj {userName}: Lista postaci które obserwujesz:</h2>
                        <p>Komponent z mapa postaci {characters.map(e => <p key={e.name}>{e.name}</p>)}</p>
                    </>
                }

                <AddCharacter/>
            </div>
        );
    }
    return  <p>Zaloguj się by śledzić postacie.</p>

};
