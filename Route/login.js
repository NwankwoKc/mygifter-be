const express = require('express')
const app = express.Router()

//controllers
const auth = require('../Controller/login')

app.route('/login').post(auth.login)

module.exports = app;