var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');

// router.post('/register', function(req, res) {
//   if (!req.body.username || !req.body.password) {
//     res.json({ success: false, msg: 'Please pass username and password.' });
//   } else {
//     var newUser = new User({
//       username: req.body.username,
//       password: req.body.password,
//     });
//     // save the user
//     newUser.save(function(err) {
//       if (err) {
//         return res.json({ success: false, msg: 'Username already exists.' });
//       }
//       res.json({ success: true, msg: 'Successful created new user.' });
//     });
//   }
// });

router.post('/login', function(req, res) {
  console.log('!!!!!!!!!!!!!!!!!', req.body.chatId);
  User.findOne(
    {
      chatId: req.body.chatId,
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
      } else {
        var token = jwt.sign(user.toJSON(), settings.secret);
        // return the information including token as JSON
        res.json({ success: true, token: 'JWT ' + token });
      }
    },
  );
});

module.exports = router;
