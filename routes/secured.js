const express = require('express');
const passport = require('passport');

const secureRouter = express.Router();
secureRouter.use(passport.authenticate('jwt', { session: false }))

// Example :
// define the home page route
/*
secureRouter.get('/', function (req, res) {
  res.send('Birds home page')
})
*/

module.exports = secureRouter