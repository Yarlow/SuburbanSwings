// const express = require('express')
// const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')

const express = require('express')

const app = express()

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'testnodemailer420@gmail.com', // generated ethereal user
    pass: 'Node!mailer420', // generated ethereal password
  },
});

// let info = transporter.sendMail({
//     from: '"Sus Swings" <foo@example.com>', // sender address
//     to: "testnodemailer420@gmail.com", // list of receivers
//     subject: "Jacob from suburbanswings.com", // Subject line
//     text: "You a bitch", // plain text body
//     html: "<p>you kind of a </p><p style='color:red'>b</p><p style='color:blue'>i</p><p style='color:orange'>t</p><p style='color:green'>c</p><p style='color:purple'>h</p>", // html body
//   });

// console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example
app.use(bodyParser.json())      // used for all incoming requests

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-WIth, Content-Type, Accept") // Headers can only have these, i think.
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT")
  next()
})

app.post('/sendemail', (req, res, next) => {
  console.log("req received")
  let customerEmail = req.body.contactInfo
  let customerName = req.body.name
  let content = req.body.content
  let info = transporter.sendMail({
      from: customerEmail, // sender address
      to: "testnodemailer420@gmail.com", // list of receivers
      subject: "Email From Contact Us Form", // Subject line
      text: "customer name: " + customerName + "\n" + content, // plain text body
    });
    console.log(info)
    res.send(200)
})

// Node!mailer420

module.exports = app
