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

    const {userId, userToken} = useSelector((store: RootState) => store.user);

    const [gameInfo, setGameInfo] = useState([]);

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
        console.log(infoData)
        setGameInfo(infoData.participants)
    }
    console.log(gameInfo)
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
            <div className="player_game">
                {gameInfo.length > 0? gameInfo.map(enemy => <EnemyCard data={enemy} />) : null}
            </div>
        </div>
    );
};

export default PlayerCard;