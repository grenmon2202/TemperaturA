const mongoose = require('mongoose')
const room = require('../schemas/room')
const user = require('../schemas/user')
const { send_alert } = require('./alert-system')

module.exports = {
    async temp_check(no_of_rooms){
        for (let i = 0; i<no_of_rooms; i++){
            try {
                let this_room = await room.findOne({room_id: i+1})
                let accp_temps = this_room.alarm_temp
                let room_temp = this_room.temperature
                if(process.env.TEST_DEMO==='true'){
                console.log(i+1, room_temp, accp_temps)}
                if (room_temp<accp_temps[0] || room_temp>accp_temps[1]){
                    let req_user = await user.find({$or:[{room_id: i+1}, {emergency_contact: true}]})
                    let low = false
                    if (room_temp<accp_temps[0])
                        low = true
                    send_alert(req_user, low)
                }
            } catch {
                console.log(`failed to verify room safety ${i+1}`)
            }
        }
    }
}