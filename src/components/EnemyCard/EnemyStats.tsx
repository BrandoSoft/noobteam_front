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
            return <img src={Gold} alt="tier badge, in this case its Gold Badge"/>
        case "IRON":
            return <img src={Iron} alt="tier badge, in this case its Iron Badge"/>
        case "BRONZE":
            return <img src={Bronze} alt="tier badge, in this case its Bronze Badge"/>
        case "SILVER":
            return <img src={Silver} alt="tier badge, in this case its Silver Badge"/>
        case "PLATINUM":
            return <img src={Platinum} alt="tier badge, in this case its Platinum Badge"/>
        case "DIAMOND":
            return <img src={Diamond} alt="tier badge, in this case its Diamond Badge"/>
        case "MASTER":
            return <img src={Master} alt="tier badge, in this case its Master Badge"/>
        case "GRANDMASTER":
            return <img src={Grandmaster} alt="tier badge, in this case its Grandmaster Badge"/>
        case "CHALLENGER":
            return <img src={Challenger} alt="tier badge, in this case its Challenger Badge"/>
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
            <div>
                {getType(stats.queueType)}
                <p>{stats.tier} {stats.rank}</p>
            </div>
            <div>
                <div>
                    {getImage(stats.tier)}
                    LP: {stats.leaguePoints}
                        W: <span > {stats.wins} </span>
                        L: <span> {stats.losses} </span>
                    </div>



            </div>

        </div>
    );
};

export default EnemyStats;