import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getGameScore, getHistoryGamesIds} from "../../apiCalls/matches";

import './EnemyCard.scss'

interface Props {
    puuid: string;
}
export type Scores = {
    name: string;
    deaths: number;
    kills:number;
    assists: number;
    lane: string;
    role: string;
    win: boolean;
}

const EnemyHistory = ({puuid}: Props) => {
    const {userToken} = useSelector((store: RootState) => store.user);
    const version = process.env.REACT_APP_DDRAGON;

    const [list, setList]= useState<Scores[]>([]);

    useEffect(() => {
            (async () => {
                try {
                    const gameHistoryIds = await getHistoryGamesIds(puuid, userToken)
                    const gamesHistoryList = await getGameScore(gameHistoryIds, userToken);
                    await setList(gamesHistoryList)
                } catch (e) {
                    console.log(e)
                }
            })()

        }, []
    )
    console.log(`lista`,list)
    return (
        <div className="history">
            {list && list.map(item =>( <div key={puuid+item.name} className="history__container">
                <img className="history__small"
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.name}.png`}
                    alt=""/>
                <div style={{backgroundColor:`${item.win? "red":"green"}`, width:"100%"}}
                >Z: {item.kills} / Z: {item.deaths} / A: {item.assists}  <p>{item.role} / {item.lane}</p></div>
            </div>))
            }
        </div>
    );

}
export default EnemyHistory;

