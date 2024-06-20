const db = require('../db/index');
const sequelize = require('sequelize')
const datatypes = sequelize.DataTypes;
const fn = sequelize.fn;


const user = db.define('user',{
    uid: {
        type: datatypes.UUID, 
        defaultValue:fn("uuid_generate_v4"),
        primaryKey: true,
        allowNull: false
    },
    userid:{
    type: datatypes.INTEGER,
    allowNull: false
    },
    name:{
        type:datatypes.STRING,
        allowNull:false
    },
    role: {
        type: datatypes.STRING,
        allowNull: false
    },
    picked: {
        type: datatypes.INTEGER,
        allowNull: true
    }
})
// user.sync({force:true})
module.exports = user