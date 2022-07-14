import React, {useState} from 'react';
import {SimpleCharactersEntity} from 'types'

import './PlayerCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import EnemyCard from "../EnemyCard/EnemyCard";
import {BiCommentError} from "react-icons/bi";


interface Props {
    data: SimpleCharactersEntity
}

//@TODO resolve problem with prop type

const PlayerCard = ({data, refresh}: any) => {
    const version = process.env.REACT_APP_DDRAGON;

    const {userId, userToken} = useSelector((store: RootState) => store.user);

    const [resMsg, setResMsg] = useState(null);
    const [championsList, setChampionsList] = useState();
    const [ally, setAlly] = useState<any[]>([]);
    const [enemy, setEnemy] = useState<any[]>([]);

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

        if (res.status === 400) {
            setResMsg(infoData.errors[0].msg)
            setTimeout(() => setResMsg(null), 3000)
        } else {
            setAlly(infoData.participants.filter((e: any) => e.teamId === 100))
            setEnemy(infoData.participants.filter((e: any) => e.teamId === 200))


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
                {
                    resMsg && <div className="error error-relative">
                        <BiCommentError className="error__icon"/>
                        <div className="error__message">{resMsg}</div>
                    </div>
                }
                <div className="player__ally">
                    {ally.length > 0 && <p className="title">Twój Team:</p>}
                    <div className="enemy-cards">
                        {ally.length > 0 ? ally.map(item => <EnemyCard data={item} key={item.summonerName}
                                                                       list={championsList}/>) : null}
                    </div>
                </div>

                <div className="player__enemy">
                    {enemy.length > 0 && <p className="title">Przeciwnicy:</p>}
                    <div className="enemy-cards">
                        {enemy.length > 0 ? enemy.map(item => <EnemyCard data={item} key={item.summonerName}
                                                                         list={championsList}/>) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;