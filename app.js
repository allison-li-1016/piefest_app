const express = require('express');
const app = express();
const multer = require('multer');

const LOCAL_PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());


app.get('/hello', async function(req,res){
    res.type("text").send("Hello");
});




app.use(express.static('public'));
const PORT = process.env.PORT || LOCAL_PORT;
app.listen(PORT);