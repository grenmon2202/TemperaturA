if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const passport = require('passport')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')
const meth_override = require('method-override')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to mongo"))

const users = require('./schemas/user')

const init_pass = require('./pass-config')
init_pass(
    passport
)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}))
app.use(express.static(__dirname + '/views'))
app.use(meth_override('_method'))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', check_not_auth, (req, res) => {
    res.render('login.ejs')
})

app.get('/dashboard', check_auth, (req, res) => {
    res.render('dashboard.ejs')
})

app.get('/admin_dashboard', check_auth_admin, (req, res) => {
    res.render('admin_dashboard.ejs')
})

app.post('/login', check_not_auth, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,

}))

app.post('/admin_dashboard', (req, res) => {
    res.redirect('/new_user')
})

app.get('/new_user', check_auth_admin, (req, res) => {
    res.render('user.ejs')
})

app.delete('/logout', (req,res) => {
    req.logOut()
    res.redirect('/login')
})

async function check_auth(req, res, next){
    const our_user = await req.user
    if (req.isAuthenticated()){
        if (our_user.admin){
            return res.redirect('/admin_dashboard')
        }
        return next()
    }

    res.redirect('/login')
}

async function check_auth_admin(req, res, next){
    const our_user = await req.user
    if (req.isAuthenticated()){
        if (!our_user.admin){
            return res.redirect('/login')
        }
        return next()
    }

    res.redirect('/login')
}

function check_not_auth(req, res, next){
    if (req.isAuthenticated()){
        
        return res.redirect('/dashboard')
    }

    next()
}

app.listen(3000)