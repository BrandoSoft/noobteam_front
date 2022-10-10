import React, {useState} from 'react';
import {RiotCharacterEntity} from 'types'

import './NewCharacter.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {addSummonerToDb} from "../../apiCalls/characters";
import {getSummonerAvatar} from "../../apiCalls/ddragon";

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
      <div className="player__info">
        <div className="player__info--top">
            <img className="player__info--avatar"
                 src={getSummonerAvatar(String(characterData.profileIconId))}
                    alt="summoner avatar"/>
            <div className="player__info--text">
                <p className="player__info--text--name">{characterData.name}</p>
                <p className="player__info--text--info"> Poziom: {characterData.summonerLevel}</p>
                <p className="player__info--text--info"> Dywizja: </p>
            </div>
        </div>
        <div className="player__info--buttons">
            <button onClick={addPlayerToDB} className="long">Dodaj gracza do obserwowanych</button>
            <button onClick={clear} className="short">Usuń</button>
        </div>
    </div>
    );
};

export default NewCharacter;