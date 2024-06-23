const express = require('express')
const app = express.Router()

//controllers
const authorization = require('../Middleware/authorization')
const userController = require('../Controller/user')
//routes
app.route('/users').get(authorization.authorize,userController.getuser).post(authorization.authorize,userController.postuser);
app.route('/users/:id').patch(authorization.authorize,userController.edituser).delete(authorization.authorize,userController.delete)


module.exports = app;