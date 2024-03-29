//TODO api callls will be moved here in the future

import {RiotCharacterEntity} from "types";


export const addSummonerToDb = async (data: RiotCharacterEntity, userId: string, userToken: string) => {
    const userData = {
        name: data.name,
        userId: userId,
        puuid: data.puuid,
        accountId: data.accountId,
        id: data.id,
        profileIconId: data.profileIconId,
        revisionDate: data.revisionDate,
        summonerLevel: data.summonerLevel,
    }
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    const resData = await res.json()
    const resStatus = res.status
    return {resData, resStatus}
}

export const getPlayerList = async (userId: string, userToken: string) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    return await res.json()
}

export const getSummonerData = async (summonerName: string, userToken: string) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/find/${summonerName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    console.log(`wywołanie getSummonerData`)
    return await res.json()
}

export const getSummonerLeague = async (summonerId: string, userToken: string) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/leagues/${summonerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    console.log(`wywołanie getSummonerLeague`)
    return await res.json()
}

export const removePlayer = async (name: string, userId: string, userToken: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND}/characters/`, {
            method: 'DELETE',
            body: JSON.stringify({
                name: name,
                userId: userId
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
}