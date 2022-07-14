import React from 'react';

import {LeaguesEntity} from 'types'

import Iron from '../../img/tiers/Emblem_Iron.png'
import Silver from '../../img/tiers/Emblem_Silver.png'
import Gold from '../../img/tiers/Emblem_Gold.png'
import Platinum from '../../img/tiers/Emblem_Platinum.png'
import Diamond from '../../img/tiers/Emblem_Diamond.png'
import Master from '../../img/tiers/Emblem_Master.png'
import Grandmaster from '../../img/tiers/Emblem_Grandmaster.png'
import Bronze from '../../img/tiers/Emblem_Bronze.png'
import Challenger from '../../img/tiers/Emblem_Challenger.png'

const getImage = (tier: string) => {
    switch (tier) {
        case "GOLD":
            return <img src={Gold} alt="tier badge, in this case its Gold Bage"/>
        case "IRON":
            return <img src={Iron} alt="tier badge, in this case its Iron Bage"/>
        case "BRONZE":
            return <img src={Bronze} alt="tier badge, in this case its Bronze Bage"/>
        case "SILVER":
            return <img src={Silver} alt="tier badge, in this case its Silver Bage"/>
        case "PLATINUM":
            return <img src={Platinum} alt="tier badge, in this case its Platinum Bage"/>
        case "DIAMOND":
            return <img src={Diamond} alt="tier badge, in this case its Diamond Bage"/>
        case "MASTER":
            return <img src={Master} alt="tier badge, in this case its Master Bage"/>
        case "GRANDMASTER":
            return <img src={Grandmaster} alt="tier badge, in this case its Grandmaster Bage"/>
        case "CHALLENGER":
            return <img src={Challenger} alt="tier badge, in this case its Challenger Bage"/>
        default:
            return null
    }
}
const getType = (type: string) => {
    switch (type) {
        case 'RANKED_FLEX_SR':
            return 'FLEX'
        case 'RANKED_SOLO_5x5':
            return 'SOLO Q'
        case 'RANKED_TFT_DOUBLE_UP':
            return 'TFT'
        default:
            return 'Brak rankedów!'
    }
}

interface Props {
    stats: LeaguesEntity
}

const EnemyStats = ({stats}: Props) => {

    return (
        <div className="stats">
            <div className="stats__que">
                {getType(stats.queueType)}
            </div>
            <div className="stats__tier">
                <div className="stats__tier__left">
                    {getImage(stats.tier)}
                    <p>LP: {stats.leaguePoints}</p>
                    <div>

                        <p className=" score">W: <span className="win"> {stats.wins}</span></p>
                        <p className=" score">L: <span className="lose"> {stats.losses}</span></p>
                    </div>
                </div>
                <p className="stats__tier__rank">{stats.tier} {stats.rank}</p>

            </div>

        </div>
    );
};

export default EnemyStats;