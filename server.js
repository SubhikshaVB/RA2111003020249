const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

let otpCode = '';
let userPhoneNumber = '';

app.post('/send-otp', (req, res) => {
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

app.post('/verify-otp', (req, res) => {
    const { otp } = req.body;

    if (otp === otpCode) {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
