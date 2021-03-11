const LocalStrategy = require('passport-local').Strategy

function init(passport, get_user, get_user_by_id){
    const auth_user = (email, pwd, done) =>{
        const user_req = get_user (email)
        if (user_req==null){
            return done(null, false, {message: 'Username not found'})
        }

        //console.log(user_req, pwd)
        
        if(pwd === user_req.pwd){
            return done (null, user_req)
        } else{
            return done (null, false, {message: 'Passwords do not match'})
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'pwd'}, auth_user))

    passport.serializeUser ((user, done) => done(null,user.id))
    passport.deserializeUser ((id, done) => {return done(null, get_user_by_id(id))})
}

module.exports = init