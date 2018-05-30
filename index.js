
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const secureRouter = require('./routes/secured')
const anonRouter = require('./routes/anonymous')
require('./config/passport')

const app = express()
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.set('port', (process.env.PORT || 4000));

app.use('/', anonRouter)

// secured route example: 
// app.use('/birds', secureRouter)


const server = app.listen(
  app.get('port'),
  () => {
    console.log('App listening on port %s!', app.get('port'));
  })
