const mongoose = require('mongoose')

const room_schema = new mongoose.Schema({
    room_id: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    alarm_temp: {
        type: [Number],
        required: true,
    },
    thermostat: {
        type: Number,
        required: true,
    },
    safe: {
        type: Boolean,
        required: true,
    },
    residential: {
        type: Boolean,
        required: true,
    },
    occupied: {
        type: Boolean,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('rooms', room_schema)