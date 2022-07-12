import React, {useState} from 'react';
import {SimpleCharactersEntity} from 'types'

import './PlayerCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import EnemyCard from "../EnemyCard/EnemyCard";

interface Props {
    data: SimpleCharactersEntity
}

//@TODO resolve problem with prop type

const PlayerCard = ({data, refresh}: any) => {
    const version = process.env.REACT_APP_DDRAGON;

    const {userId, userToken} = useSelector((store: RootState) => store.user);

    const [gameInfo, setGameInfo] = useState<any[]>([]);
    const [resMsg, setResMsg] = useState(null);
    const [championsList, setChampionsList] = useState('nie zaladowalem sie jeszcze')

    const removePlayerFromList = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/`, {
                method: 'DELETE',
                body: JSON.stringify({
                    name: data.name,
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );
        refresh()
    }

    const getChampData = async () => {
        const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)


        const data = await res.json()
        setChampionsList(data.data)

    }

    const checkGame = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/game/${data.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );

        const infoData = await res.json()

        if(res.status === 400) {
            setResMsg(infoData.errors[0].msg)
            setTimeout(()=> setResMsg(null),3000)
        }else{
            setGameInfo(infoData.participants)

        }
        const resChamp = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)


        const champData = await resChamp.json()
        setChampionsList(champData.data)
    }
    return (
        <div className="player">
            <div className="player__info">
                <button onClick={checkGame}>Sprawdz mecz</button>
                <p>{data.name}</p>
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/${data.profileIconId}.png`}
                    alt=""/>
                <p> LVL: {data.summonerLevel}</p>
                <button onClick={removePlayerFromList}>Przestań obserwować</button>
            </div>
            <div className="player__game">
                <p>{resMsg && resMsg}</p>
               <div className="player__ally">
                    {gameInfo.length > 0? gameInfo.filter(e=>e.teamId === 100).map(enemy => <EnemyCard data={enemy} list={championsList} />) : null}
                </div>

                <div className="player__enemy">
                    {gameInfo.length > 0? gameInfo.filter(e=>e.teamId === 200).map(enemy => <EnemyCard data={enemy} list={championsList} />) : null}
                </div>


            </div>
        </div>
    );
};

export default PlayerCard;