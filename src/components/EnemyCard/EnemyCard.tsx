import React, {useEffect, useState} from 'react';

import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {LeaguesEntity} from 'types'
import EnemyStats from "./EnemyStats";
import {getSummonerData, getSummonerLeague} from "../../apiCalls/characters";
import {getChampData, getPlayerAvatar} from "../../apiCalls/ddragon";
import EnemyHistory from "./EnemyHistory";

import './EnemyCard.scss'
import unranked from '../../img/unranked.webp'

const EnemyCard = ({data, list, displayStyle}: any) => {

    const {userToken} = useSelector((store: RootState) => store.user);
    const [leagueInfo, setLeagueInfo] = useState<LeaguesEntity[] | []>([]);
    const [champName, setChampName] = useState<string | null>(null);
    const [puuid, setPuuid] = useState<string | null>(null);


    const version = process.env.REACT_APP_DDRAGON;


    useEffect(() => {
        (async () => {

            const champData = await getChampData();
            const summonerData = await getSummonerData(data.summonerName, userToken);
            const summonerLeague = await getSummonerLeague(summonerData.id, userToken);

            await setLeagueInfo(summonerLeague)
            await setPuuid(summonerData.puuid)

            const nameFinder = async () => {

                for (let i in champData.data) {

                    if (champData.data[i].key === String(data.championId)) {
                        await setChampName(champData.data[i].id);
                    }
                }
            }
            await nameFinder()
        })()

    }, [])


    return (
        <div className="enemy">
            <div className={`enemy__topPart  ${displayStyle}`}>
                <div className={`enemy__info ${displayStyle}`}>
                    {
                        champName &&
                        <img className="enemy__img" src={getPlayerAvatar(champName)} alt="summoner avatar"/>
                    }
                    <div className="enemy__info-text">
                        <p className="enemy__info-text-summoner">{data.summonerName}</p>
                        <p className={`enemy__info-text-champ ${displayStyle}`}>{champName}</p>
                    </div>
                </div>
                <div className="enemy__stats">
                    {leagueInfo.length > 0 ? leagueInfo.filter(data => data.queueType === 'RANKED_SOLO_5x5').sort((a, b) => b.queueType.length - a.queueType.length).map(league =>
                            <EnemyStats key={league.leagueId + league.summonerId}
                                        stats={league}/>) :
                        <div className="enemy__unranked"><
                            img className="enemy__unranked-img" src={unranked} alt="unranked badge"/>
                            <p className="enemy__unranked-text">Brak rankingu</p></div>}
                </div>
            </div>
            {puuid && <EnemyHistory puuid={puuid}/>}
        </div>

    );
}


export default EnemyCard;