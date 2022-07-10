import React, { useEffect, useState } from 'react';
import { AddCharacter } from "../AddCharacter/AddCharacter";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store'
import PlayerCard from "../PlayerCard/PlayerCard";

export const Characters = () => {
    const { userToken, userName, isLoggedIn, userId } = useSelector((store: RootState) => store.user)

    const [characters, setCharacters] = useState([]);

    const getPlayerList = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );
        const characterList = await res.json()
        await setCharacters(characterList)
    }
    console.log(characters)


    useEffect(() => {
        if (isLoggedIn) {
           getPlayerList()
        }
    }, [userName]);

    if (isLoggedIn) {
        return (
            <div>

                {
                    characters.length > 0 &&
                    <>
                        <h2>Witaj {userName}: Lista postaci które obserwujesz:</h2>
                         {characters.map(e => <PlayerCard data={e} key={e.puuid} refresh={getPlayerList}/>)}
                    </>
                }

                <AddCharacter refresh={getPlayerList}/>
            </div>
        );
    }
    return <p>Zaloguj się by śledzić postacie.</p>

};
