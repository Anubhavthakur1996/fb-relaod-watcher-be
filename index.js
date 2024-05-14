"use strict";
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config();

// Create the express app
const app = express();

app.use(cors());

// Middleware for parsing JSON data
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.PASSWORD,
  },
});

app.post("/mail", (req, res) => {
  console.log("BODY:", req.body);
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: process.env.RECIEVER_EMAIL,
    subject: "Update regarding the marketplace",
    text: `The new product shown is ${req?.body?.title} and its priced at ${req?.body?.cost}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send(error);
    } else {
      console.log("Email sent:", info.response);
      res.status(200);
    }
  });
});

// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send();
});

// Start server
app.listen(1234, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log("Started at http://localhost:1234");
});
