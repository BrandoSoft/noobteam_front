import React, {useEffect, useState} from 'react';

import './EnemyCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {LeaguesEntity} from 'types'
import EnemyStats from "./EnemyStats";
import {getSummonerData, getSummonerLeague} from "../../apiCalls/characters";
import {getChampData} from "../../apiCalls/ddragon";
import EnemyHistory from "./EnemyHistory";


const EnemyCard = ({data, list, displayStyle}: any) => {

    const {userToken} = useSelector((store: RootState) => store.user);
    const [leagueInfo, setLeagueInfo] = useState<LeaguesEntity[] | []>([]);
    const [champName, setChampName] = useState<string | null>(null);
    const [puuid, setPuuid] = useState<string| null>(null);


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
        <div className={displayStyle}>
            <div className="nameAndImg">
            <p>{data.summonerName}</p>
            {champName && <img className="enemyImg"
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`}
                alt=""/>}
                            </div>
            <div>
                {leagueInfo.length > 0 ? leagueInfo.filter(data => data.queueType === 'RANKED_SOLO_5x5').sort((a, b) => b.queueType.length - a.queueType.length).map(league =>
                        <EnemyStats key={league.leagueId + league.summonerId}
                                    stats={league}/>) :
                    <div>BRAK RANKINGU</div>}
    {/*lub data.queueType !== 'RANKED_TFT_DOUBLE_UP'*/}

            </div>
            {puuid && <EnemyHistory puuid={puuid}/>}
        </div>

    );
}


export default EnemyCard;