import React, {useState} from 'react';
import {RiotCharacterEntity} from 'types'

import './NewCharacter.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {addSummonerToDb} from "../../apiCalls/characters";

interface Props {
    characterData: RiotCharacterEntity,
    show: () => {},
    clear: ()=> void
}

const NewCharacter = ({characterData, show, clear}: Props) => {
    const version = process.env.REACT_APP_DDRAGON;

    const {userToken, userId} = useSelector((store: RootState) => store.user);
    const [resMsg, setResMsg] = useState(null)


    const addPlayerToDB = async () => {

        const {resStatus, resData} = await addSummonerToDb(characterData, userId, userToken)

        if(resStatus === 400) {
            setResMsg(resData.errors[0].msg)
            setTimeout(()=> setResMsg(null),3000)
        }
        if(resStatus === 200){
            show();
            clear();
        }

    };

    return (
        <div className='followedSummoner'>
            <p>{characterData.name}</p>
            <img
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${characterData.profileIconId}.png`}
                alt=""/>
            <p>Summoner LVL: {characterData.summonerLevel}</p>
            <button onClick={addPlayerToDB}>Dodaj gracza do obserwowanych</button>
            <p>{resMsg && resMsg}</p>
        </div>
    );
};

export default NewCharacter;