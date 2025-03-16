const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const { ConnectAndQuery } = require('./sql.js');

const LOCAL_PORT = 3001;
const FRONTEND_BUILD_DIR = '../piefest_frontend/build';

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

app.use(express.static(path.resolve(__dirname, FRONTEND_BUILD_DIR)));

app.get('/hello', async function(req,res){
    res.type("text").send("Hello from react backend");
});

app.get('/sqltest', async function(req,res){
    let sqlRes = await ConnectAndQuery();

    let sqlResJson = { "sqlRes": sqlRes };
    res.type("json").send(sqlResJson);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, FRONTEND_BUILD_DIR, 'index.html'));
});

app.use(express.static('public'));
const PORT = process.env.PORT || LOCAL_PORT;
app.listen(PORT);