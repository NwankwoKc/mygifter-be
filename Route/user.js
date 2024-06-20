const express = require('express')
const app = express.Router()

//controllers
const userController = require('../Controller/user')
//routes
app.route('/user').get(userController.getuser).post(userController.postuser);

module.exports = app;