const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');
const { VoteForPieQuery, BakePieQuery, AddUserQuery} = require('./sqlqueries.js');
const {returnPassword} = require('./PasswordGenerator.js');

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

router.post('/bake-pie/:name', async (req, res) => {
    try { 
        await BakePie(req.params.name);
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

router.post('/add-user', async (req, res) => {
    try { 
        const userData = await AddUser(req.body.username);
        res.json({
            message: "User is entered into the competition 👨🏻‍🍳",
            username: userData[0], 
            password: userData[1]
        });
    } catch (err) {
        res.status(500).send(`User entry failed: ${err.message}`);
    }
});

async function AddUser(username) {
    if (!(typeof username === "string" && username.trim().length > 0 && username.length <= 50)) {
        throw new Error("Invalid username: must be a non-empty string within 50 characters.");
    }

    var password = returnPassword();

    await ConnectAndQuery(AddUserQuery, new Map([
        ['username', username],
        ['password', password],
    ]));

    return [username, password];
}

module.exports = router;