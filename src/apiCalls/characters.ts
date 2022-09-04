

//TODO api callls will be moved here in the future


export const getPlayerList = async (userToken: string, userId:string) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    const characterList = await res.json()

}

export const getSummonerData = async (summonerName: string, userToken:string) =>{
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/find/${summonerName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    return await res.json()
}

export const getSummonerLeague = async (summonerId: string, userToken: string) =>{
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/leagues/${summonerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    return await res.json()
}