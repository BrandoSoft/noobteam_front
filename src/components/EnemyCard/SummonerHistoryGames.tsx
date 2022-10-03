import React, {useEffect, useState} from 'react';
import {LeaguesEntity} from 'types'
import './EnemyCard.scss'
import {getGameScore, getHistoryGamesIds} from "../../apiCalls/matches";
import {Scores} from "./EnemyHistory";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getSummonerData} from "../../apiCalls/characters";
import {v4 as uuidv4} from "uuid";

interface Props {
    info: LeaguesEntity,
    hideModal: ()=>void
}

const SummonerHistoryGames = ({info, hideModal}: Props) => {

    const {userToken} = useSelector((store: RootState) => store.user);
    const version = process.env.REACT_APP_DDRAGON;

    const [list, setList]= useState<Scores[]>([]);

    useEffect(() => {

            (async () => {
                try {
                    const summonerData = await getSummonerData(info.summonerName, userToken);

                    const gameHistoryIds = await getHistoryGamesIds(summonerData.puuid, userToken, 10)
                    const gamesHistoryList = await getGameScore(gameHistoryIds, userToken);
                    await setList(gamesHistoryList)
                } catch (e) {
                    console.log(e)
                }
            })()

        }, []
    )
    console.log(`lista w karcie postaci`,list)

    return (
        <div className="summonerModal">
                        {info.summonerName}
            {list && list.map(item =>( <div key={uuidv4()} className="history__container">
                <img className="history__small"
                     src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.name}.png`}
                     alt=""/>
                <div style={{backgroundColor:`${item.win? "red":"green"}`, width:"100%"}}
                >Z: {item.kills} / Z: {item.deaths} / A: {item.assists}  <p>{item.role} / {item.lane}</p></div>
            </div>))
            }
            <button onClick={hideModal}> X</button>
        </div>
    );
};

export default SummonerHistoryGames;