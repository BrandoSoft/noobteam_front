import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getGameScore, getHistoryGamesIds} from "../../apiCalls/matches";
import { v4 as uuidv4 } from 'uuid';

import './EnemyCard.scss'
import SummonerStats from "../GameInfo/SummonerStats";

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


    const [list, setList]= useState<Scores[]>([]);

    useEffect(() => {

            (async () => {
                try {
                    const gameHistoryIds = await getHistoryGamesIds(puuid, userToken, 3)
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
            {list && list.map(item =>(<>
                <SummonerStats name={item.name}/>
                <div style={{backgroundColor:`${item.win? "red":"green"}`, width:"100%"}}
                >Z: {item.kills} / Z: {item.deaths} / A: {item.assists}  <p>{item.role} / {item.lane}</p></div>
            </>))
            }
        </div>
    );

}
export default EnemyHistory;

