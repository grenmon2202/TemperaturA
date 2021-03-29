const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    emergency_contact: {
        type: Boolean,
        required: true,
    },
    phone_nos: {
        type: String,
        required: true,
    },
    room_id: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('users', user_schema)