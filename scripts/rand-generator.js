const mongoose = require('mongoose')
const room = require('../schemas/room')
const { temp_check } = require('./check-safety')
var unsafe_chance = 50000000;
// make unsafe_chance = 5 when demonstration is required

if(process.env.TEST_DEMO==='true')
    unsafe_chance=3

module.exports = {
    async generator(no_of_rooms){
        for (var i = 0; i<no_of_rooms; i++){
            try {
                let this_room = await room.findOne({room_id: i+1})
                let accp_temps = this_room.alarm_temp
                let diff = accp_temps[1]-accp_temps[0]
                let rand_high_low = Math.floor(Math.random()*2)
                let temp = Math.floor(Math.random()*diff)+accp_temps[0]
                let thermo_temp = temp + (Math.floor(Math.random()*3) * (Math.round(Math.random())?1:-1))
                let unsafe = Math.floor(Math.random()*unsafe_chance)
                temp = (unsafe === 1)?((rand_high_low===0)?(accp_temps[0]-3):(accp_temps[1]+3)):temp
                let isSafe = (unsafe === 1)?false:true
                await room.findOneAndUpdate(
                    {
                        room_id: i+1
                    },
                    {
                        temperature: temp,
                        thermostat: thermo_temp,
                        safe: isSafe
                    },
                    {
                        upsert: true
                    }
                )
            } catch {
                console.log(`failed to update room info ${i+1}`)
            }
        }
        temp_check(no_of_rooms)
    }
}