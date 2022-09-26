import React, {useEffect, useState} from 'react';

import './EnemyCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {LeaguesEntity} from 'types'
import EnemyStats from "./EnemyStats";
import {getSummonerData, getSummonerLeague} from "../../apiCalls/characters";
import {getChampData} from "../../apiCalls/ddragon";


const EnemyCard = ({data, list, displayStyle}: any) => {

    const {userToken} = useSelector((store: RootState) => store.user);
    const [leagueInfo, setLeagueInfo] = useState<LeaguesEntity[] | []>([]);
    const [champName, setChampName] = useState<string | null>(null);

    const version = process.env.REACT_APP_DDRAGON;


    useEffect(() => {
        (async () => {

            const champData = await getChampData();
            const summonerData = await getSummonerData(data.summonerName, userToken);
            const summonerLeague = await getSummonerLeague(summonerData.id, userToken);

            await setLeagueInfo(summonerLeague)

            const nameFinder = async () => {

                for (let i in champData.data) {

                    if (champData.data[i].key === String(data.championId)) {
                        await setChampName(champData.data[i].id);
                    }
                }
            }
            await nameFinder()

            //@TODO Pobieranie historii meczy danego gracza niemożliwe, z pod ograniczeń aktualnego klucza API. Oczekuje na akceptację wniosku udostępnienia klucza developerskiego.

            // setSummonerInfo(summonerData)

            //     const resGameHistory = await fetch(`${process.env.REACT_APP_BACKEND}/matches/playermatches/${summonerData.puuid}`, {
            //             method: 'GET',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'x-auth-token': userToken,
            //             },
            //         }
            //     );
            //     const gameHistory = await resGameHistory.json()
            //     console.log('historia gier', summonerData.puuid, gameHistory)
            //
            //
            //
            // for (const e of gameHistory) {
            //     const resInfo = await fetch(`${process.env.REACT_APP_BACKEND}/matches/matchinfo/${e}`, {
            //             method: 'GET',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'x-auth-token': userToken,
            //             },
            //         }
            //     );
            //     const info = await resInfo.json()
            //     console.log(e, info)
            //     // setHistory({...history, info})
            //     // console.log('historia',history)
            // }
        })()

        // }


    }, [])


    return (
        <div className={displayStyle}>
            <div className="nameAndImg">
            <p>{data.summonerName}</p>
            {champName && <img className="enemyImg"
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`}
                alt=""/>}
            </div>
            {/*<p>cos{history}</p>*/}
            <div>
                {leagueInfo.length > 0 ? leagueInfo.filter(data => data.queueType === 'RANKED_SOLO_5x5').sort((a, b) => b.queueType.length - a.queueType.length).map(league =>
                        <EnemyStats key={league.leagueId + league.summonerId}
                                    stats={league}/>) :
                    <div>BRAK RANKINGU</div>}
    {/*lub data.queueType !== 'RANKED_TFT_DOUBLE_UP'*/}

            </div>
        </div>

    );
}


export default EnemyCard;