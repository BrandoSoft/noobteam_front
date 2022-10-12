
const version = process.env.REACT_APP_DDRAGON;

export const getChampData = async (): Promise<any>=>{
    const resChamp = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)

    return await resChamp.json()
}

export const getPlayerAvatar = (name: string): string =>{
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name}.png`
}

export const getSummonerAvatar = (profileIconId:string): string =>{
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`
}