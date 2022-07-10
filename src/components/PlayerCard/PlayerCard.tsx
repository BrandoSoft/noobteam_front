import React from 'react';
import {SimpleCharactersEntity} from 'types'

import './PlayerCard.scss'

interface Props {
    data: SimpleCharactersEntity
}

//@TODO resolve problem with prop type

const PlayerCard = ({data}: any) => {

    const removePlayerFromList =() =>{
        console.log()
    }

    return (
        <div className="player">
            <div className="player__info">
                <p>{data.name}</p>
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/${data.profileIconId}.png`}
                    alt=""/>
                <p> LVL: {data.summonerLevel}</p>
                <button onClick={removePlayerFromList}>Przestań obserwować</button>
            </div>
            <div className="player_game"></div>
        </div>
    );
};

export default PlayerCard;