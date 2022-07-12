import React, {useEffect, useState} from 'react';

import './EnemyCard.scss'

const EnemyCard = ({data, list}: any) => {
    // console.log(data)
    const version = process.env.REACT_APP_DDRAGON;
    let champName = ''

       for (let i in list) {
        if (list[i].key == data.championId) {
            champName = list[i].id
        }}

    return (
        <div className="enemy">
           <img
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`}
                alt=""/>
            <p className="enemy__name">{data.summonerName}</p>
            <p>{data.id}</p>
        </div>
    );
};

export default EnemyCard;