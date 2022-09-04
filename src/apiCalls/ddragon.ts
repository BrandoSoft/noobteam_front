
const version = process.env.REACT_APP_DDRAGON;

export const getChampData = async (): Promise<any>=>{
    const resChamp = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)

    return await resChamp.json()
}