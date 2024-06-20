const express = require('express')
const app = express.Router();

//controller
const pick = require('../Controller/pick')

app.route('/pick').patch(pick.picked)

module.exports = app