const getPieUids = async () => {
    return ["550e8400-e29b-41d4-a716-446655440000", "6ba7b810-9dad-11d1-80b4-00c04fd430c8", "f47ac10b-58cc-4372-a567-0e02b2c3d479"];
}

const getPie = async (uid) => {
    // Simulate fetching pie data from an API
    return {
        name: `Pie ${uid}`,
        description: `Description for Pie ${uid}`,
        image: `https://via.placeholder.com/150?text=Pie+${uid}`
    };
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