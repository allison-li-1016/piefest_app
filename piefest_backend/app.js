const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from react backend");
});

async function BakePie(pieId, name) {
    try {
        if (!Number.isInteger(userId)) {
            throw new Error("Invalid userId: must be an integer.");
        }
        if (!isValidVarchar(name, 100)) {  
            throw new Error("Invalid pie name: must be a non-empty string within 100 characters.");
        }

        await ConnectAndQuery(BakePieQuery, new Map([
            ['userID', userId],
            ['name', name]
        ]));

        console.log("You chefed up a pie ;)");
    } catch (err) {
        console.error(`Pie entry failed: ${err.message}`);
    }
}

module.exports = router;