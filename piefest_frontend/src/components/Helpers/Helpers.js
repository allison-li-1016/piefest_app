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

const getTopPies = async () => {
    try {
        let res = await fetch('/backend/calculate-votes');
        if (res.status != 200) {
            throw new Error(`Failed to get pie results with error code ${res.status}. Please try again.`);
        }
        let resJson = await res.json();

        return resJson.results
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
    try {
        const votePromises = Object.entries(ratings)
        .filter(([_, vote]) => vote !== null && vote !== '')
        .map(async ([pieId, vote]) => {
            const body = {
                "userId": userUid,
                "pieId": parseInt(pieId),
                "vote": parseFloat(vote)
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            const res = await fetch('/backend/vote', requestOptions);
            
            if (!res.ok) {
                const errorText = await res.text();
                console.error('Vote casting failed:', {
                    pieId: pieId,
                    status: res.status,
                    statusText: res.statusText,
                    errorMessage: errorText
                });
                throw new Error(`Vote casting failed for pie ${pieId}: ${errorText}`);
            }
            return true;
        });

        await Promise.all(votePromises);
        return true;
    } catch (error) {
        console.error('Error in updatePieRatings:', error.message);
        throw error;
    }
}

const getRankings = async () => {
    try {
        let res = await fetch('/backend/calculate-votes');
        if (res.status != 200) {
            throw new Error(`Failed to get all pies with error code ${res.status}. Please try again.`);
        }
        let resJson = await res.json();
        // Transform array into dictionary
        const resultsDict = resJson.results.reduce((acc, curr) => {
            acc[curr.PieId] = curr.AverageVote;
            console.log(acc);
            return acc;
        }, {});
        return resultsDict;
    } catch (err) {
        throw new Error(`Failed to get all pies. Please try again. Error: ${err.message}`);
    }
}

export { getPieUids, getPie, updatePieRatings, getRankings, getTopPies};