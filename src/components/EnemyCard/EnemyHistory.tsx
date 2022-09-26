import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getGameScore, getHistoryGamesIds} from "../../apiCalls/matches";
import EnemyCard from "./EnemyCard";

interface Props {
    puuid: string;
}

const EnemyHistory = ({puuid}: Props) => {
    const {userToken} = useSelector((store: RootState) => store.user);

    const [list, setList]= useState<string[]>([]);

    useEffect(() => {
            (async () => {
                try {
                    const gameHistoryIds = await getHistoryGamesIds(puuid, userToken)

                    const gamesHistoryList = await getGameScore(gameHistoryIds, userToken);

                    // console.log(gamesHistoryList[1])

                    await setList(gamesHistoryList)
                } catch (e) {
                    console.log(e)
                }
            })()

        }, []
    )
    console.log(`lista`,list)
    return (
        <div>
            {list && list.map(item => <div key={item.name}>{item.name}</div>)}
        </div>
    );

}
export default EnemyHistory;