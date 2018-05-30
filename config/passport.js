const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { findUser } = require('./database')
const { jwtSecret } = require('./constants')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  },
    async (jwtPayload, done) => {
      const user = await findUser(jwtPayload.username)
      return (user !== null) ?
        done(null, { id: user.id, username: user.username }) :
        done(null, false)
    }
  )
)