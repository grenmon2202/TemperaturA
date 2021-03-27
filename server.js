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
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const rand_gen = require('./scripts/rand-generator')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to mongo"))

const users = require('./schemas/user')
const room = require('./schemas/room')
var no_of_rooms
room.countDocuments({}, function (err, count){
    if (err) console.log(err)
    else{
        no_of_rooms=count
        console.log(no_of_rooms)
        rand_gen.generator(no_of_rooms)
    }
})

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
app.use(express.static(__dirname + '/views/css'))
app.use(meth_override('_method'))
app.use(body_parser.urlencoded({ limit: '10mb', extended: false }))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', check_not_auth, (req, res) => {
    rand_gen.generator(no_of_rooms)
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

app.post('/new_user', (req, res) => {
    let isadmin = false
    if(req.body.admin==='1')
        isadmin=true
    const user = new users({
        _id: req.body.uname,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        pwd: req.body.mobno,
        admin: isadmin,
        emergency_contact: false,
        $push: {phone_nos: req.body.mobno},
        room_id: no_of_rooms+1,
    }).save(async (err, newUser) => {
        if (err) {
            res.render('user.ejs', {user: user, errorMessage:'Please make sure that all fields are entered correctly and that the user does not already exist'})
            console.log(err)
        } else {
            no_of_rooms++
            try {
                temp = Math.floor(Math.random()*25)+15
                thermo_temp = temp + (Math.floor(Math.random()*3) * (Math.round(Math.random())?1:-1))
                await room.findOneAndUpdate(
                    {
                        room_id: no_of_rooms
                    },
                    {
                        room_id: no_of_rooms,
                        temperature: temp,
                        alarm_temp: [15,40],
                        thermostat: thermo_temp,
                        safe: true,
                        residential: true,
                        occupied: true,
                        user_id: req.body.uname
                    },
                    {
                        upsert: true
                    }
                )
            } catch {
                console.log('error generating room info')
            }
            res.redirect('/admin_dashboard')
        }
    })
})

app.get('/new_user', check_auth_admin, (req, res) => {
    res.render('user.ejs', { user: new users(), errorMessage:''})
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