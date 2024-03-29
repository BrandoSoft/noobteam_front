import {Scores} from "../components/EnemyCard/EnemyHistory";
import axios from "axios";

export const getHistoryGamesIds = async (puuid: string, userToken: string, counter:number): Promise<string[]> => {

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/matches/playermatches/${puuid}/${counter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    return await res.json()
}

export const getGameScore = async (gamesIds: string[], userToken: string) => {
    const gameScores: Scores[] = [];
    const badShaco = {
        name: "Shaco",
        deaths: 999,
        assists: 0,
        kills: 0,
        role: "Too Many",
        lane: "Requests",
        win: false
    }
    const apiCall = async (gameId: string) => {
        const res = await axios(`${process.env.REACT_APP_BACKEND}/matches/matchinfo/${gameId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );
        return res
    }

    for (const gameId of gamesIds) {
        const res = await apiCall(gameId)
        if (res.data !== "Too many request, APIKEY cant handle so much") {
            gameScores.push(await res.data)
        }
        if (res.data === "Too many request, APIKEY cant handle so much") {
            console.warn(res.data)
            gameScores.push(badShaco)
        }
    }

    return gameScores;
}

