const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');
const { BakePieQuery } = require('./sqlqueries.js');

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from react backend");
});

router.post('/bake-pie', async (req, res) => {
    try { 
        await BakePie(req.body.name);
        res.send("You chefed up a pie 🥳");
    } catch (err) {
        res.status(500).send(`Pie entry failed: ${err.message}`);
    }
});

async function BakePie(name) {
    if (!(typeof name === "string" && name.trim().length > 0 && name.length <= 100)) {
        throw new Error("Invalid pie name: must be a non-empty string within 100 characters.");
    }
    await ConnectAndQuery(BakePieQuery, new Map([
        ['name', name]
    ]));
}

module.exports = router;