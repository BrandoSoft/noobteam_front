import React, { useEffect, useState } from 'react';
import { AddCharacter } from "./AddCharacter";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store'
import PlayerCard from "../PlayerCard/PlayerCard";
import { SimpleCharactersEntity } from 'types';
import './Characters.scss'

export const Characters = () => {
    const { userToken, userName, isLoggedIn, userId } = useSelector((store: RootState) => store.user)

    const [characters, setCharacters] = useState<SimpleCharactersEntity | any>([]);

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


    useEffect(() => {
        if (isLoggedIn) {
           getPlayerList()
        }
    }, [userName]);

    if (isLoggedIn) {
        return (
            <div className="followedContainer">
                {
                    characters.length > 0 &&
                    <>
                        <h2>Obserwowane konta:</h2>
                         <div className="summonerCards">
                             {characters.map((e: SimpleCharactersEntity) => <PlayerCard data={e} key={e.name} refresh={getPlayerList}/>)}
                         </div>
                    </>
                }
                <AddCharacter refresh={getPlayerList}/>
            </div>
        );
    }
    return <p>Zaloguj się by śledzić postacie.</p>

};
