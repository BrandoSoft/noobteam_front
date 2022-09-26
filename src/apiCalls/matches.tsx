export const getHistoryGamesIds = async (puuid: string, userToken: string): Promise<string[]> => {

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/matches/playermatches/${puuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    return await res.json()
}

export const getGameScore = async (gameIds: string[], userToken:string) => {
    const gameScores:string[] = [];

    for (const gameId of gameIds) {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/matches/matchinfo/${gameId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken,
                },
            }
        );
    gameScores.push(await res.json())

    }

    return gameScores;
}