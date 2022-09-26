import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getSummonerData} from "../../apiCalls/characters";

interface Props {
    puuid: string;
}

const EnemyHistory = ({puuid}: Props) => {
    const {userToken} = useSelector((store: RootState) => store.user);
        useEffect(() => {

            //@TODO Pobieranie historii meczy danego gracza niemożliwe, z pod ograniczeń aktualnego klucza API. Oczekuje na akceptację wniosku udostępnienia klucza developerskiego.
            (async () => {
                try {

                    const resGameHistory = await fetch(`${process.env.REACT_APP_BACKEND}/matches/playermatches/${puuid}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-auth-token': userToken,
                            },
                        }
                    );
                    const gameHistory = await resGameHistory.json()
                    console.log(`historia gier`,gameHistory)


                } catch (e) {
                    console.log(e)
                }

                //     for (const e of gameHistory) {
                //         const resInfo = await fetch(`${process.env.REACT_APP_BACKEND}/matches/matchinfo/${e}`, {
                //                 method: 'GET',
                //                 headers: {
                //                     'Content-Type': 'application/json',
                //                     'x-auth-token': userToken,
                //                 },
                //             }
                //         );
                //         const info = await resInfo.json()
                //         console.log(e, info)
                //         // setHistory({...history, info})
                //         // console.log('historia',history)
                //     }
            })()

        }, []
    )

    return (
        <div>
            historia gier
        </div>
    );

}
export default EnemyHistory;