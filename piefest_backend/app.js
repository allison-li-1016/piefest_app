const express = require('express');
const router = express.Router();
const { ConnectAndQuery } = require('./sql.js');
const { AddPieImage, VerifyUserQuery, GetUserQuery, VoteForPieQuery, BakePieQuery, AddUserQuery, GetAllPiesQuery, GetPieQuery, GetVotesQuery, CheckForExistingVoteQuery, UpdateVoteQuery, GetAllVotesForUserQuery } = require('./sqlqueries.js');
const { generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } = require('@azure/storage-blob');
const {returnPassword} = require('./PasswordGenerator.js');

router.get('/hello', async (req, res) => {
    res.type("text").send("Hello from react backend");
});

router.get('/get-user-votes/:userid', async (req, res) => {
    try { 
        const votes = await ConnectAndQuery(GetAllVotesForUserQuery, new Map([
            ['userId', req.params.userid]
        ]));
        res.json({
            message: "User successfully retrieved 👨🏻‍🍳",
            allVotes: votes
        });
    } catch (err) {
        res.status(500).send(`Get User Votes failed: ${err.message}`);
    }
});

router.post('/vote', async (req, res) => {
    try { 
        const existingVote = await CheckForExistingVote(req.body.userId, req.body.pieId);
        if (existingVote && existingVote.length > 0) {
            await UpdateVote(req.body.userId, req.body.pieId, req.body.vote);
            res.send("Vote casted successfully.");
        } else {
            await VoteForPie(req.body.pieId, req.body.vote, req.body.userId);
            res.send("Vote casted successfully.");
        }
    } catch (err) {
        res.status(500).send(`Vote cast failed: ${err.message}`);
    }
});

async function CheckForExistingVote(userId, pieId) {
    if (!Number.isInteger(userId)) {
        throw new Error("Invalid userId: must be an integer.");
    }
    if (!Number.isInteger(pieId)) {
        throw new Error("Invalid pieId: must be an integer.");
    }

    const existingVote = await ConnectAndQuery(CheckForExistingVoteQuery, new Map([
        ['userId', userId],
        ['pieId', pieId]
    ]));

    return existingVote;
}

async function UpdateVote(userId, pieId, vote) {
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

    await ConnectAndQuery(UpdateVoteQuery, new Map([
        ['userId', userId],
        ['pieId', pieId], 
        ['vote', vote]
    ]));
}

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
        var pieId = await BakePie(req.params.name, req.body.image);
        //console.log(pieId);
        res.json({ "pieId": pieId });
    } catch (err) {
        res.status(500).send(`Pie entry failed: ${err.message}`);
    }
});

async function BakePie(name, base64ImageData) {
    if (!(typeof name === "string" && name.trim().length > 0 && name.length <= 100)) {
        throw new Error("Invalid pie name: must be a non-empty string within 100 characters.");
    }
    let res = await ConnectAndQuery(BakePieQuery, new Map([
        ['name', name],
        ['image', base64ImageData ? base64ImageData : null]
    ]));
    return res[0].pieId;
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
        console.log(err);
        res.status(500).send(`User entry failed: ${err}`);
    }
});

async function AddUser(username) {
    if (!(typeof username === "string" && username.trim().length > 0 && username.length <= 50)) {
        throw new Error("Invalid username: must be a non-empty string within 50 characters.");
    }

    const existingUser = await ConnectAndQuery(GetUserQuery, new Map([
        ['username', username]
    ]));

    var password;

    if (existingUser === undefined) {
        throw new Error("API call is messed up.");
    } else if (existingUser.length === 0) {
        // User does not exist, create a new user
        password = returnPassword();
        
        await ConnectAndQuery(AddUserQuery, new Map([
            ['username', username],
            ['password', password],
        ]));
    } else {
        password = existingUser[0].Password;
    }

    // Send email notification
    try {
        const emailUrl = process.env.ACCOUNT_CREATION_EMAIL_ENDPOINT;
        const response = await fetch(emailUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                cred: password
            })
        });
        
        if (!response.ok) {
            console.error('Email notification failed:', await response.text());
        }
    } catch (error) {
        console.error('Error sending email notification:', error);
    }

    return username;
}

router.post('/verify-user', async (req, res) => {
    try { 
        const verificationResultJson = await VerifyUser(req.body.username, req.body.password);
        if (verificationResultJson) {
            res.json({
                verificationResult: true,
                message: "User is verified 👨🏻‍🍳",
                username: verificationResultJson.Username, 
                password: verificationResultJson.Password,
                userId: verificationResultJson.UserId
            });
        } else {
            res.status(401).send("User verification failed: Invalid credentials.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(`User verification failed: ${err}`);
    }
});

async function VerifyUser(username, password) {
    const user = await ConnectAndQuery(VerifyUserQuery, new Map([
        ['username', username],
        ['password', password]
    ]));

    if (user === undefined) {
        throw new Error("API call is messed up.");
    } else if (user.length === 0) {
        return undefined; // User does not exist
    } else {
        return user[0]; // User exists
    }
}

router.get('/get-all-pies', async (req, res) => {
    try { 
        const allPies = await GetAllPies();
        res.json({
            message: "Pies successfully retrieved 🥧",
            pies: allPies
        });
    } catch (err) {
        res.status(500).send(`User entry failed: ${err.message}`);
    }
});

async function GetAllPies() {
    const pies = await ConnectAndQuery(GetAllPiesQuery);
    return pies;
}

router.get('/get-pie/:pieId', async (req, res) => {
    try { 
        const pie = await GetPie(req.params.pieId);
        res.json({
            message: "Pie successfully retrieved 🥧",
            pie: pie
        });
    } catch (err) {
        res.status(500).send(`Get Pie failed: ${err.message}`);
    }
});

async function GetPie(pieIdString) {
    const pieId = parseInt(pieIdString, 10);
    if (isNaN(pieId)) {
        throw new Error("Invalid pieId: must be a valid integer.");
    }

    const pie = await ConnectAndQuery(GetPieQuery, new Map([
        ['pieId', pieId]
    ]));
    return pie;
}

router.get('/calculate-votes', async (req, res) => {
    try { 
        limit = parseInt(req.body.limit, 10);
        const votes = await GetResults(limit);
        
        res.json({
            message: "Votes successfully calculated 🥸",
            results: votes
        });
    } catch (err) {
        res.status(500).send(`Get votes failed: ${err.message}`);
    }
});

async function GetResults(limit) {
    if (isNaN(limit)) {
        limit = 10;
    } 
    
    if (limit < 0) {
        throw new Error("Limit must be greater than or equal to 0.");
    } 

    const votes = await ConnectAndQuery(GetVotesQuery, new Map([
        ['limit', limit]
    ]));
    return votes;
}

router.post('/add-image/:pieId/filename/:filename', async (req, res) => {
    try { 
        var pieId = req.params.pieId;
        var filename = req.params.filename;
        var blobName = `blob${pieId}.${filename}`;
        var imageUrl = await generateSasUrl(blobName);
        var storeImageUrl = `https://piefestdevstorage.blob.core.windows.net/piefestdevimages/${blobName}`;
        await ConnectAndQuery(AddPieImage, new Map([
            ['pieId', pieId],
            ['image', storeImageUrl]
        ]));

        var resp = {
            message: "Image successfully added 🎨",
            imageUrl: imageUrl
        }

        //console.log(resp)

        res.json(resp);
    } catch (err) {
        res.status(500).send(`Add image failed: ${err.message}`);
    }
})

//function for generating URL extension

//function for generating SAS token 

async function generateSasUrl(blobName) {
    // TODO: these need to be an env variable
    const accountName = process.env.STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.STORAGE_ACCOUNT_KEY; 
    const credential = new StorageSharedKeyCredential(accountName, accountKey);
    const containerName = "piefestdevimages";
    const sasToken = generateBlobSASQueryParameters({
        containerName,
        blobName,
        permissions: BlobSASPermissions.parse("rcw"), 
        startsOn: new Date(new Date().valueOf() - 3600 * 1000),
        expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // 24 hours from now
    }, credential).toString();
    const sasUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

    return sasUrl;
}

module.exports = router;