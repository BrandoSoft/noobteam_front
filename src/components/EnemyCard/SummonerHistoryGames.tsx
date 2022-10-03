import React from 'react';
import {LeaguesEntity} from 'types'
import './EnemyCard.scss'

interface Props {
    info: LeaguesEntity,
    hideModal: ()=>void
}

const SummonerHistoryGames = ({info}: Props) => {
    return (
        <div className="summonerModal">
            {info.summonerId}
        </div>
    );
};

export default SummonerHistoryGames;