import React from 'react';
import {getPlayerAvatar} from "../../apiCalls/ddragon";
import {Scores} from "../EnemyCard/EnemyHistory";

interface Props {
    name: string;
    kills: number;
    assists: number;
    deaths: number;
    role: string;
    win: boolean;
    lane: string;
}

const SummonerStats = (stats: Props) => {

    return (
        <div className="history__component">
            <img className="history__component-img" src={getPlayerAvatar(stats.name)} alt=""/>
            {stats.win
                ?<p className="history__component-green">Wygrana</p>
                :<p className="history__component-red">Przegrana</p>
            }

            <p className="history__component-text">{stats.kills}/{stats.deaths}/{stats.assists}</p>
        </div>


    );
};

export default SummonerStats;