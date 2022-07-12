import React, {SyntheticEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import NewCharacter from "../NewCharacter/NewCharacter";
import {RiotCharacterEntity} from 'types'

interface Props{
    refresh: ()=>{}
}

export const AddCharacter = ({refresh}: Props) => {

    const {userToken} = useSelector((store: RootState) => store.user)
    const [name, setName] = useState("");
    const [character, setCharacter] = useState<RiotCharacterEntity | null>(null)
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

        }
        setName('');
    };

    return (
        <div className="loginForm">
            <p>Wpisz nazwę postaci:</p>
            <form onSubmit={findCharacter}>
                <input
                    type="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Szukaj</button>
            </form>
            {resError && <div>{resError}</div>}

            {character && <NewCharacter characterData={character} show={refresh}/>}
        </div>
    );
};