const getPieUids = async () => {
    try {
        let res = await fetch('/backend/get-all-pies');
        if (res.status != 200) {
            throw new Error(`Failed to get all pies with error code ${res.status}. Please try again.`);
        }
        let resJson = await res.json();
        return resJson.pies.map((pie) => {
            return pie.PieId;
        })
    } catch (err) {
        throw new Error(`Failed to get all pies. Please try again. Error: ${err.message}`);
    }
}

const getPie = async (uid) => {
    try {
        let res = await fetch('/backend/get-pie/' + uid);
        let resJson = await res.json();
        if (res.status != 200) {
            throw new Error(`Failed to get pie with error code ${res.status} with resp ${res.message}. Please try again.`);
        }
        let frontEndPie = {
            name: resJson.pie[0].PieName
        }
        return frontEndPie
    } catch (err) {
        throw new Error(`Failed to get pie. Please try again. Error: ${err.message}`);
    }
}

const updatePieRatings = async (userUid, ratings) => {
    return true;
}

const getRankings = async () => {
    // Simulate fetching rankings from an API
    let ratings = { "550e8400-e29b-41d4-a716-446655440000": 8.5 ,
        "6ba7b810-9dad-11d1-80b4-00c04fd430c8": 7.2 ,
        "f47ac10b-58cc-4372-a567-0e02b2c3d479": 9.1 }
    ;
    return ratings;
}

export { getPieUids, getPie, updatePieRatings, getRankings };