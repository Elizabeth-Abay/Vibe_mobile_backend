const path = require('path');
const emailTransporter = require('../config/emailTransporter');
const renderEjs = require('../utils/renderingEjs');

async function sendingOTPEmail({ email, OTP }) {
    try {
        let tempalatePath = path.join(__dirname, '../views/otpTemplate.ejs');

        const html = await renderEjs({ tempalatePath,  placeHolders : {otp: OTP } });

    let result = await emailTransporter.sendMail({
        from: `VIBE NOTIFICATIONS`,
        to: email,
        subject: 'OTP verification',
        html
    });

    return {
        success: true
    }
} catch (err) {

}
}



module.exports = { sendingOTPEmail }