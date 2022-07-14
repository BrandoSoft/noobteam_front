import React, {SyntheticEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import NewCharacter from "../NewCharacter/NewCharacter";
import {RiotCharacterEntity} from 'types'

interface Props {
    refresh: () => {}
}

export const AddCharacter = ({refresh}: Props) => {

    const {userToken} = useSelector((store: RootState) => store.user)
    const [name, setName] = useState("");
    const [character, setCharacter] = useState<RiotCharacterEntity | null>(null)
    const [randomCharacter, setRandomCharacter] = useState<RiotCharacterEntity | null>(null)
    const [resError, setResError] = useState(null);


    const findCharacter = async (e: SyntheticEvent) => {
        e.preventDefault();
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
    };

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
                <p>Wpisz nazwę postaci:</p>
                <form onSubmit={findCharacter} className="characters__form">
                    <input
                        type="name"
                        placeholder="Nazwa Przywoływacza"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className="login">Szukaj</button>
                </form>
                <button onClick={getRandomChamp} className="login"> Lub wylosuj!</button>
                {resError && <div>{resError}</div>}


            </div>
        </div>
    );
};

//@TODO Walidacja formularza (empty)