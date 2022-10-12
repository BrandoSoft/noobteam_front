import Iron from '../img/tiers/Emblem_Iron.png'
import Silver from '../img/tiers/Emblem_Silver.png'
import Gold from '../img/tiers/Emblem_Gold.png'
import Platinum from '../img/tiers/Emblem_Platinum.png'
import Diamond from '../img/tiers/Emblem_Diamond.png'
import Master from '../img/tiers/Emblem_Master.png'
import Grandmaster from '../img/tiers/Emblem_Grandmaster.png'
import Bronze from '../img/tiers/Emblem_Bronze.png'
import Challenger from '../img/tiers/Emblem_Challenger.png'
import React from "react";

export const getImage = (tier: string) => {
    switch (tier) {
        case "GOLD":
            return <img className="stats__badge" src={Gold} alt="tier badge, in this case its Gold Badge"/>
        case "IRON":
            return <img className="stats__badge" src={Iron} alt="tier badge, in this case its Iron Badge"/>
        case "BRONZE":
            return <img className="stats__badge" src={Bronze} alt="tier badge, in this case its Bronze Badge"/>
        case "SILVER":
            return <img className="stats__badge" src={Silver} alt="tier badge, in this case its Silver Badge"/>
        case "PLATINUM":
            return <img className="stats__badge" src={Platinum} alt="tier badge, in this case its Platinum Badge"/>
        case "DIAMOND":
            return <img className="stats__badge" src={Diamond} alt="tier badge, in this case its Diamond Badge"/>
        case "MASTER":
            return <img className="stats__badge" src={Master} alt="tier badge, in this case its Master Badge"/>
        case "GRANDMASTER":
            return <img className="stats__badge" src={Grandmaster}
            alt="tier badge, in this case its Grandmaster Badge"/>
        case "CHALLENGER":
            return <img className="stats__badge" src={Challenger}
            alt="tier badge, in this case its Challenger Badge"/>
        default:
            return null
    }
}
export const getType = (type: string) => {
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
