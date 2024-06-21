const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken')

//controllers
const auth = require('../Controller/login')

app.route('/login').post(auth.login)

module.exports = app;