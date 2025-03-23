const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from react backend");
});

async function VoteForPie(pieId, vote, userId) {
    try {
        if (!Number.isInteger(userId)) {
            throw new Error("Invalid userId: must be an integer.");
        }
        if (!Number.isInteger(pieId)) {
            throw new Error("Invalid pieId: must be an integer.");
        }
        if (typeof vote !== "number" || Number.isInteger(vote)) {
            throw new Error("Invalid vote: must be a float.");
        }
        if (vote < 0 || vote > 10) {
            throw new Error("Vote value must be between 0 and 10.");
        }

        await ConnectAndQuery(VoteForPieQuery, new Map([
            ['userID', userId],
            ['pieID', pieId], 
            ['vote', vote]
        ]));

        console.log("Vote casted successfully.");
    } catch (err) {
        console.error(`Vote cast failed: ${err.message}`);
    }
}

module.exports = router;