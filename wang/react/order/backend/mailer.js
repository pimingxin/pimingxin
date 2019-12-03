var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '849344069',
    pass: ''
  }
});

module.exports = transporter
