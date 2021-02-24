const express = require("express");
const sessions = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

// New session - log in form
sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// Create new session
sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (!foundUser) {
      res.redirect("/sessions/new");
      console.log("no user found");
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/");
      } else {
        console.log("wrong password");
        res.redirect("/sessions/new");
      }
    }
  });
});

// Session Delete - sign out
sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;