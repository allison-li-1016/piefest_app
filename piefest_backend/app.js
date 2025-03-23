const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from react backend");
});

module.exports = router;