// Dependencies 

const express = require('express');
const app = express();
const food = require('./models/food.js');
//Port

const port = 5000;

app.get('/oiishidle', (req,res) => {
    res.send(food);
});

app.listen(port, () => {
    console.log("listening to " + port)
});

