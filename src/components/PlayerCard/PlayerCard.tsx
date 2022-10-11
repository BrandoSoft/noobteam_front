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
    const [resMsg, setResMsg] = useState(null);
    const [ally, setAlly] = useState<any[]>([]);
    const [enemy, setEnemy] = useState<any[]>([]);
    const [extraBig, setExtraBig] = useState(false);

    const removePlayerFromList = async () => {
        await removePlayer(data.name, userId, userToken)
        refresh()
    }

    const expandGameArea = ()=>{
        // setExtraBig(!extraBig)
        setAlly([])
        setEnemy([])
        setExtraBig(false)
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
        setExtraBig(true)

    }
    return (
        <div className={`player ${extraBig? "superBig": "superSmall"}`}>
            <div className="player__info">
                <div className="player__info--top">
                    <img className="player__info--avatar"
                         src={getSummonerAvatar(String(data.profileIconId))}
                         alt=""/>
                    <div className="player__info--text">
                        <p className="player__info--text--name">{data.name}</p>
                        <p className="player__info--text--info"> Poziom: {data.summonerLevel}</p>
                        <p className="player__info--text--info"> Dywizja: </p>
                    </div>
                </div>
                <div className="player__info--buttons">
                    <button onClick={checkGame}>Historia gier</button>
                    <button onClick={checkGame}>Sprawdz mecz</button>
                    <button onClick={removePlayerFromList}>Usuń</button>
                    <button onClick={expandGameArea}>X</button>
                </div>
            </div>

            <div className={`player__game ${extraBig? "superBig": "superSmall"}`}>
                {
                    resMsg && <ErrorComponent content={resMsg}/>
                }
                <div className="player__game--ally">
                    {enemy.length > 0 && <p className="title">Twój team</p>}
                    <div className="enemy-cards">
                        {enemy.length > 0 ? enemy.map(item => <EnemyCard data={item} key={item.summonerName}
                                                                         displayStyle={"reverse"}
                        />) : null}
                    </div>
                </div>
                <div className="player__game--enemy">
                    {ally.length > 0 && <p className="title">
                        Przeciwnicy</p>}
                    <div className="enemy-cards">
                        {ally.length > 0 ? ally.map(item => <EnemyCard data={item} key={item.summonerName}
                                                                       displayStyle={""}
                        />) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;