// Dependencies 

const express = require('express');
const app = express();

//Port

const port = 5000;

app.get('/oiishidle', (req,res) => {
    res.send("Welcome to the Oiishi webpage!");
});

app.listen(port, () => {
    console.log("listening to " + port)
});

