import React, {useEffect, useState} from 'react';

import './EnemyCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {LeaguesEntity} from 'types'
import EnemyStats from "./EnemyStats";


const EnemyCard = ({data, list}: any) => {

    const {userToken} = useSelector((store: RootState) => store.user);
    const [leagueInfo, setLeagueInfo] = useState<LeaguesEntity[] | []>([])

    const version = process.env.REACT_APP_DDRAGON;
    let champName = ''

    for (let i in list) {
        if (list[i].key == data.championId) {
            champName = list[i].id
        }
    }

    useEffect(() => {
        // if (data) {
        (async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/find/${data.summonerName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userToken,
                    },
                }
            );
            const summonerData = await res.json()

            const league = await fetch(`${process.env.REACT_APP_BACKEND}/characters/leagues/${summonerData.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userToken,
                    },
                }
            );
            const summonerLeague = await league.json()
            setLeagueInfo(summonerLeague)


            //@TODO Pobieranie historii meczy danego gracza niemożliwe, z pod ograniczeń aktualnego klucza API. Oczekuje na akceptację wniosku udostępnienia klucza developerskiego.

            // setSummonerInfo(summonerData)
            //
            //             const resGameHistory = await fetch(`${process.env.REACT_APP_BACKEND}/matches/playermatches/${summonerData.puuid}`, {
            //                     method: 'GET',
            //                     headers: {
            //                         'Content-Type': 'application/json',
            //                         'x-auth-token': userToken,
            //                     },
            //                 }
            //             );
            //             const gameHistory = await resGameHistory.json()
            //             // console.log(gameHistory)
            //
            //             for (const e of gameHistory) {
            //                 const resInfo = await fetch(`${process.env.REACT_APP_BACKEND}/matches/matchinfo/${e}`, {
            //                         method: 'GET',
            //                         headers: {
            //                             'Content-Type': 'application/json',
            //                             'x-auth-token': userToken,
            //                         },
            //                     }
            //                 );
            //                 setLast(await resInfo.json())
            //             }
        })()

        // }
    }, [])

    return (
        <div className="enemy">
            <p className="enemy__name">{data.summonerName}</p>
            <img
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`}
                alt=""/>
            <>
                {leagueInfo.length > 0 ? leagueInfo.map(league => <EnemyStats key={league.leagueId + league.summonerId}
                                                                              stats={league}/>) :
                    <div>BRAK RANKINGU</div>}
            </>
        </div>

    );
}


export default EnemyCard;