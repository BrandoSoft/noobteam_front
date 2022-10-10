import React, {SyntheticEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import NewCharacter from "../NewCharacter/NewCharacter";
import {RiotCharacterEntity} from 'types'
import ErrorComponent from "../../utils/ErrorComponent";

import { BsSearch } from 'react-icons/bs';

interface Props {
    refresh: () => {}
}

export const AddCharacter = ({refresh}: Props) => {

    const {userToken} = useSelector((store: RootState) => store.user)
    const [name, setName] = useState("");
    const [character, setCharacter] = useState<RiotCharacterEntity | null>(null)
    const [randomCharacter, setRandomCharacter] = useState<RiotCharacterEntity | null>(null)
    const [resError, setResError] = useState<string | null>('');


    const findCharacter = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (name.length > 1) {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/find/${name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userToken,
                    },
                }
            );
            const data = await res.json()

            if (res.status === 200) {
                setCharacter(data)
            }
            if (res.status !== 200) {
                setResError(data.errors[0].msg)
                setTimeout(() => setResError(null), 3000)

            }
            setName('');
        } else {
            setResError('Nie zapomnij czegoś wpisać ;)')
            setTimeout(() => setResError(null), 3000)
        }
    }

    const getRandomChamp = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/random/player`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );
        const data = await res.json()

        if (res.status === 200) {
            setRandomCharacter(data)
        }
        if (res.status !== 200) {
            setResError(data.errors[0].msg)
            setTimeout(() => setResError(null), 3000)
        }
    }


    return (
        <div className="addCharacterContainer">
            <div className="newCharacters">
                {character && <NewCharacter characterData={character} show={refresh} clear={() => setCharacter(null)}/>}
                {randomCharacter &&
                <NewCharacter characterData={randomCharacter} show={refresh} clear={() => setRandomCharacter(null)}/>}
            </div>
            <div className="characters">

                {resError && <ErrorComponent content={resError}/>}
                <div className="characters__iconHolder">
                    <form onSubmit={findCharacter} className="characters__form">
                        <input
                            type="name"
                            placeholder="Wyszukaj gracza..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit">{<BsSearch/>}</button>
                    </form>
                </div>
                <button onClick={getRandomChamp} className="characters__button"> Lub wylosuj!</button>
            </div>
        </div>
    );
};

