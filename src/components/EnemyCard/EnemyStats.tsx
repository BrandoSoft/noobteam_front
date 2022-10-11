import React, {useState} from 'react';
import {LeaguesEntity} from 'types'
import {getImage, getType} from "../../utils/helpers";
import SummonerHistoryGames from "./SummonerHistoryGames";

import './EnemyCard.scss'

interface Props {
    stats: LeaguesEntity
}

const EnemyStats = ({stats}: Props) => {
    const [showInfo, setShowInfo] = useState(false)
    console.log(stats)

    const showModal = () => {
        setShowInfo(true)
    }
    const hideModal = () => {
        setShowInfo(false)
    }

    return (
        <div className="stats">
            {getImage(stats.tier)}
            <div className="stats__text">
                <p className="stats__text-primary">{stats.tier} {stats.rank} <span className="stats__text-secondary">({getType(stats.queueType)})</span></p>
                <p className="stats__text-primary"> LP:<span className="stats__text-secondary">{stats.leaguePoints}</span></p>
                <p>W: <span className="stats__text-secondary"> {stats.wins} </span>L: <span className="stats__text-secondary"> {stats.losses} </span></p>
            </div>
            <div>
            </div>
            {/*<button onClick={showModal}> Szczegółowe info</button>*/}
            {showInfo && <SummonerHistoryGames info={stats} hideModal={hideModal}/>}
        </div>
    );
};

export default EnemyStats;