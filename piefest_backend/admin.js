const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');
const { CreateUserTableQuery, CreatePieTableQuery, CreateVotesTableQuery, CheckAdminCredentialsQuery } = require('./sqlqueries.js');

router.post('/createTables', async (req, res) => {
    try {
        var adminCheck = await ConnectAndQuery(CheckAdminCredentialsQuery, new Map([
            ['user', req.body.username],
            ['pass', req.body.password]
        ]));
        if (adminCheck == null || adminCheck.length == 0) {
            res.status(401).send("Invalid admin credentials");
            return;
        }
        await ConnectAndQuery(CreateUserTableQuery)
        await ConnectAndQuery(CreatePieTableQuery)
        await ConnectAndQuery(CreateVotesTableQuery)

        res.send("Tables created successfully");
    } catch (err) {
        res.status(500).send(`Error creating tables ${err.message}`);
    }

});

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from admin.js");
});

module.exports = router;