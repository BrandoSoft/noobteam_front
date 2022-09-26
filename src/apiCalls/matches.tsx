export const getHistoryGamesIds = async (puuid: string, userToken: string): Promise<string[]> => {

    const resGameHistory = await fetch(`${process.env.REACT_APP_BACKEND}/matches/playermatches/${puuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    return await resGameHistory.json()
}