const sequelize =  require('sequelize')
const dotenv = require('dotenv');
dotenv.config()

const db = new sequelize(process.env.DATABASE,{dialect:'postgres'})
db.authenticate()
module.exports = db