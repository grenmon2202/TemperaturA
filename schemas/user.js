const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
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
})

module.exports = mongoose.model('users', user_schema)