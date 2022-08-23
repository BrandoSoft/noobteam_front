import React, {useEffect, useState} from 'react';

import './EnemyCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {LeaguesEntity} from 'types'
import EnemyStats from "./EnemyStats";


const EnemyCard = ({data, list}: any) => {
    // console.log(list)


    const {userToken} = useSelector((store: RootState) => store.user);
    const [leagueInfo, setLeagueInfo] = useState<LeaguesEntity[] | []>([]);
    const [champName, setChampName] = useState<string | null>(null);


    const version = process.env.REACT_APP_DDRAGON;




    useEffect(() => {


        // if (data) {
        (async () => {

            const resChamp = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)

            const champData = await resChamp.json()


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
            await setLeagueInfo(summonerLeague)
            const nameFinder = async ()=>{

                for (let i in champData.data) {

                    if (champData.data[i].key === String(data.championId)) {
                        await setChampName(champData.data[i].id);
                        console.log(champName)
                    }
                }
                console.log('działam')
            }
            await nameFinder()

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
        // console.log('lista championow', championsList)

    }, [champName, data.championId,data.summonerName, userToken, version])

    // console.log('champname ',champName)
    // console.log('adres:', `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`);
    // console.log('przed',champName)
    return (
        <div className="enemy">
            <p className="enemy__name">{data.summonerName}</p>
            {champName && <img
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`}
                alt=""/>}
            <>
                {leagueInfo.length > 0 ? leagueInfo.map(league => <EnemyStats key={league.leagueId + league.summonerId}
                                                                              stats={league}/>) :
                    <div>BRAK RANKINGU</div>}
            </>
        </div>

    );
}


export default EnemyCard;