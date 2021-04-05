const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const users = require('./schemas/user')

function init(passport){
    const auth_user = async (email, pwd, done) =>{
        const user_req = await users.findOne({email})
        if (user_req==null){
            return done(null, false, {message: 'Username not found'})
        }

        //console.log(user_req, pwd)
        try{
            if(await (bcrypt.compare(pwd, user_req.pwd))){
                return done (null, user_req)
            } else{
                return done (null, false, {message: 'Passwords do not match'})
            }
        } catch{
            console.log('error authenticating via bcrypt')
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'pwd'}, auth_user))

    passport.serializeUser ((user, done) => done(null,user.id))
    passport.deserializeUser ((id, done) => {return done(null, get_user_by_id(id))})
}

async function get_user_by_id(id){
    const user = await users.findOne({_id:id})
    return user
}

module.exports = init