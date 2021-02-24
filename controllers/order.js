// DEPENDENCIES
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

const isAuthenticated = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/sessions/new");
  } else {
    next()
  }
}

// ROUTES
// get index
router.get('/', isAuthenticated, (req, res) => {
  // finds all users
  User.find({}, (err, foundUsers) => {
    // renders the order page
    res.render('order/index.ejs', {
      // passes the found users to the room page
      users: foundUsers,
      currentUser: req.session.currentUser
    });
  });
});

// post a new message
// NOTE: as given, this only works if you have sessions working correctly
// if you can't get sessions working correctly, see if you can modify this code so that it works even without sessions!
router.post ('/new', (req, res) => {
  // finds user by id (based on current logged in user )
  User.findOneAndUpdate(
    {_id: req.session.currentUser._id},
    // uses $push method to push the req.body.message
    { $push: { messages: req.body.message } },
    // callback
    (err, foundUser) => {
      // redirects to the room page
      res.redirect('/order');
  });
});

// EXPORT
module.exports = router;
