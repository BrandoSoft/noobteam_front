export const getParticipantsList = async (encryptedSummonerId: string, userToken: string) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/characters/game/${encryptedSummonerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
            },
        }
    );
    const info = await res.json()
    const status = res.status

    return {info, status}
}