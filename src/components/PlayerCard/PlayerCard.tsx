import React, {useState} from 'react';
import {SimpleCharactersEntity} from 'types'

import './PlayerCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import EnemyCard from "../EnemyCard/EnemyCard";
import ErrorComponent from "../../utils/ErrorComponent";
import {getParticipantsList} from "../../apiCalls/playerInfo";
import {removePlayer} from "../../apiCalls/characters";
import {getSummonerAvatar} from "../../apiCalls/ddragon";


interface Props {
    data: SimpleCharactersEntity,
    refresh: () => void
}


const PlayerCard = ({data, refresh}: Props) => {

    const {userId, userToken} = useSelector((store: RootState) => store.user);
    const version = process.env.REACT_APP_DDRAGON;
    const [resMsg, setResMsg] = useState(null);
    const [ally, setAlly] = useState<any[]>([]);
    const [enemy, setEnemy] = useState<any[]>([]);

    const removePlayerFromList = async () => {
        await removePlayer(data.name, userId, userToken)
        refresh()
    }


    const checkGame = async () => {

        const {info, status} = await getParticipantsList(data.id, userToken)

        if (status === 400) {
            setResMsg(info.errors[0].msg)
            setTimeout(() => setResMsg(null), 3000)
        } else {
            setAlly(info.participants.filter((e: any) => e.teamId === 100))
            setEnemy(info.participants.filter((e: any) => e.teamId === 200))
        }

    }
    return (
        <div className="player">
            <div className="player__info">
                <p>{data.name}</p>
                <img className="player__avatar"
                    src={getSummonerAvatar(String(data.profileIconId))}
                    alt=""/>
                <p> LVL: {data.summonerLevel}</p>
                <button onClick={checkGame}>Sprawdz mecz</button>
                <button onClick={removePlayerFromList}>Przestań obserwować</button>
            </div>
            <div className="player__game">
                {
                    resMsg && <ErrorComponent content={resMsg}/>
                }
                <div className="player__enemy">
                    {enemy.length > 0 && <p className="title">Przeciwnicy:</p>}
                    <div className="enemy-cards">
                        {enemy.length > 0 ? enemy.map(item => <EnemyCard data={item} key={item.summonerName}
                                                                         displayStyle={"enemy reverse"}
                        />) : null}
                    </div>
                </div>
                <div className="player__ally">
                    {ally.length > 0 && <p className="title">
                        Twój Team:</p>}
                    <div className="enemy-cards">
                        {ally.length > 0 ? ally.map(item => <EnemyCard data={item} key={item.summonerName}
                                                                       displayStyle={"enemy"}
                        />) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;