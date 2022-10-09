import React from 'react';
import {getPlayerAvatar} from "../../apiCalls/ddragon";

interface  Props{
    name: string
}
const SummonerStats = ({name}: Props) => {

    const version = process.env.REACT_APP_DDRAGON;

    return (
        <div>
            <img className="history__small"
                 src={getPlayerAvatar(name)}
                 alt=""/>
        </div>
    );
};

export default SummonerStats;