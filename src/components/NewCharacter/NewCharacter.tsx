import React, {useState} from 'react';
import {RiotCharacterEntity} from 'types'

import './NewCharacter.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface Props {
    characterData: RiotCharacterEntity,
    show: () => {},
    clear: ()=> void
}

const NewCharacter = ({characterData, show, clear}: Props) => {

    const {userToken, userId} = useSelector((store: RootState) => store.user);
    const [resMsg, setResMsg] = useState(null)


    const addPlayerToDB = async () => {
        const userData = {
            name: characterData.name,
            userId: userId,
            puuid: characterData.puuid,
            accountId: characterData.accountId,
            id: characterData.id,
            profileIconId: characterData.profileIconId,
            revisionDate: characterData.revisionDate,
            summonerLevel: characterData.summonerLevel,
        }
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );

        const data = await res.json()

        if(res.status === 400) {
            setResMsg(data.errors[0].msg)
            setTimeout(()=> setResMsg(null),3000)
        }
        if(res.status === 200){
            show();
            clear();
        }

    };

    return (
        <div className='newCharacterCard'>

            <p>{characterData.name}</p>
            <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/${characterData.profileIconId}.png`}
                alt=""/>
            <p>Summoner LVL: {characterData.summonerLevel}</p>
            <button onClick={addPlayerToDB}>Dodaj gracza do obserwowanych</button>
            <p>{resMsg && resMsg}</p>
        </div>
    );
};

export default NewCharacter;