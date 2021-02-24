// Dependencies 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');


//Port

const port = 5000;

//MIDDLEWARE
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Static
app.use(express.static('public'));

//sessions
app.use(session({
    secret: "faewfewfaf",
    resave: false,
    saveUninitialized: false
  }));

//method override
app.use(methodOverride("_method"));

//CONTROLLERS
// menu
const roomController = require('./controllers/menu.js');
app.use('/menu', roomController);

//order
const orderController = require('./controllers/order.js');
app.use('/order', orderController);

// user
const userController = require("./controllers/users.js");
app.use("/users", userController);


// session
const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

//Index

app.get('/', (req, res) => {
    res.render('index.ejs', {currentUser: req.session.currentUser});
  });

//SEED ROUTE
const seed = require('./models/seed.js');
const User = require('./models/users.js');

app.get('/seedAgents', (req, res) => {
  // encrypts the given seed passwords
  seed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  // seeds the data
  User.create(seed, (err, createdUsers) => {
    // logs created users
    console.log(createdUsers);
    // redirects to index
    res.redirect('/');
  });
});

//CONNECTIONS
app.listen(port, () => {
    console.log("listening to " + port)
});

mongoose.connect('mongodb://localhost:27017/kingsman');
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


