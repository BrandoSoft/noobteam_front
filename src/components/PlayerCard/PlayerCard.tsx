import React from 'react';
import {SimpleCharactersEntity} from 'types'

import './PlayerCard.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface Props {
    data: SimpleCharactersEntity
}

//@TODO resolve problem with prop type

const PlayerCard = ({data, refresh}: any) => {

    const {userId, userToken} = useSelector((store: RootState) => store.user)

    const removePlayerFromList = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/`, {
                method: 'DELETE',
                body: JSON.stringify({
                    name: data.name,
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );
        refresh()
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