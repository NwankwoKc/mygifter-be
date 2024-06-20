const express = require('express')
const app = express.Router()

//controllers
const userController = require('../Controller/user')
//routes
app.route('/users').get(userController.getuser).post(userController.postuser);
app.route('/users/:id').patch(userController.edituser).delete(userController.delete)

module.exports = app;