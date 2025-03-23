const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from react backend");
});

async function AddUser(UserId, Username, Password) {
    try {
        if (!Number.isInteger(UserId)) {
            throw new Error("Invalid userId: must be an integer.");
        }
        if (!isValidVarchar(Username, 50)) {  
            throw new Error("Invalid username: must be a non-empty string within 50 characters.");
        }
        if (!isValidVarchar(Password, 64)) {  
            throw new Error("Invalid password: must be a non-empty string within 64 characters.");
        }

        await ConnectAndQuery(AddUserQuery, new Map([
            ['userID', UserID],
            ['Username', Username],
            ['Password', Password],
        ]));

        console.log("You chefed up a pie ;)");
    } catch (err) {
        console.error(`Pie entry failed: ${err.message}`);
    }
}

module.exports = router;