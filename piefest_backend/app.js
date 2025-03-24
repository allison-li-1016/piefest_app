const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');
const { VoteForPieQuery } = require('./sqlqueries.js');

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from react backend");
});

router.post('/vote', async (req, res) => {
    try { 
        await VoteForPie(req.body.pieId, req.body.vote, req.body.userId);
        res.send("Vote casted successfully.");
    } catch (err) {
        res.status(500).send(`Vote cast failed: ${err.message}`);
    }
});

async function VoteForPie(pieId, vote, userId) {
    if (!Number.isInteger(userId)) {
        throw new Error("Invalid userId: must be an integer.");
    }
    if (!Number.isInteger(pieId)) {
        throw new Error("Invalid pieId: must be an integer.");
    }
    if (vote % 1 !== 0) {
        throw new Error("Invalid vote: must be a float.");
    }
    if (vote < 0 || vote > 10) {
        throw new Error("Vote value must be between 0 and 10.");
    }

    await ConnectAndQuery(VoteForPieQuery, new Map([
        ['userId', userId],
        ['pieId', pieId], 
        ['vote', vote]
    ]));
}

module.exports = router;