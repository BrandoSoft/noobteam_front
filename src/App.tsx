import React, {useState} from 'react';
import './App.css';

function App() {

    const API_Key = 'RGAPI-34974773-29b7-4da3-8274-2a42a020648b';
    const apiAddress = "eun1.api.riotgames.com";
    const summonerInfo= "lol/summoner/v4/summoners/by-name/"

    const [userName, setUserName] = useState('BrandoTheWheeler');

    const apiCall= `${apiAddress}/${summonerInfo}${userName}?api_key=${API_Key}`;


    const searchForPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('poszlo', apiCall)
        e.preventDefault()
        const res = await fetch(apiCall);
        // const data = await res.json()

        console.log(res)

        const cos = await fetch('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/BrandoTheWheeler?api_key=RGAPI-34974773-29b7-4da3-8274-2a42a020648b')
        // const cos2 = await cos.json()

        console.log(cos)
    };


    return (
        <div className="App">
            <form onSubmit={e => searchForPlayer(e)}>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                    <button type="submit" >wyslij</button>
            </form>
        </div>
);
}

export default App;
