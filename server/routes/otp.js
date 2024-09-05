const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

let otpCode = '';
let userPhoneNumber = '';

router.post('/send-otp', (req, res) => {
    userPhoneNumber = req.body.phoneNumber;
    otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    client.messages.create({
        body: `Your OTP code is ${otpCode}`,
        from: twilioPhoneNumber,
        to: userPhoneNumber
    })
    .then(message => res.json({ success: true }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.post('/verify-otp', (req, res) => {
    const { otp } = req.body;

    if (otp === otpCode) {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
});

module.exports = router;
