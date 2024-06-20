const express = require('express');
const app = express()
const login = require('./Route/login')
const pick = require('./Route/picked')
const user = require('./Route/user')
//miiddleware
app.use(express.json())
app.use('/',login)
app.use('/',pick)
app.use('/',user)



module.exports = app