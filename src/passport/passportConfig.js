const mongoUsers = require("../daos/users/mongodbUsers");
const bcrypt = require("bcrypt");
const saltRounds = 10
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

const users = new mongoUsers();

passport.use("local-signup", new LocalStrategy ({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
}, async (username, password, done) => {
    let user = await users.getTheUser(username)
    const hash = bcrypt.hash(password, saltRounds);

    if (user) {
        console.log("El usuario ya existe");
        return done (null, false)
    }
    let newUser = await users.save({email: username, password: hash})
    return done (null, newUser)
}
))

passport.use("local-login", new LocalStrategy(async (username, password, done) => {
    let user = await users.getTheUser(username)

    if (user) {
        if(bcrypt.compareSync(password, user.password)){
            return done (null, user);
        }
    }
    return done (null, false)
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    let user = await users.getById(id)
    done(null,user)
})

module.exports = passport