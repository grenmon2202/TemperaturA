const nodemailer = require('nodemailer')
const email = 'temperatura.tempalertservice@gmail.com'
const password = 'seproject8'

module.exports = {
    async send_alert(user, is_low){
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        
        const mailOptions = {
            from: email,
            to: 'iit2019005@iiita.ac.in',
            subject: 'Temperatura Room Temparature Alert',
            html: `A temperature anomaly has been detected in room no. ${user.room_id}!! Your room temperature has ${is_low?'fallen below':'exceeded'} the temperature thresholds! If the problem persists even after adjusting thermostat levels kindly contact support for a servicing request.`
        }
        
        info = await transport.sendMail(mailOptions)
        console.log("Message sent: %s", info.messageId);
    }
}