const asyncwrapper = require('../Utility/asyncwrapper')
const db = require('../Model/user');
const { where, Op } = require('sequelize');
const { picked } = require('./pick');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

exports.login = asyncwrapper(async (req,res,next)=>{
    const body = req.body;

    let auth = await db.findOne({
        where:{
            code: body.code
        },attributes:['code','picked']
    })
    if(!auth){
        return res.status(401).json({
            message:'userID does not exist'
        })
    }

    let ck = await db.findOne({
        where:{
            picked:body.code
        },attributes:['code','picked','name']
    })
  
    if(ck){
        return res.status(200).json({
            user:ck
        })
    }
    //if the individual has not picked at all it gets all the users that have not been picked 
    let findall = await db.findAll({
        where:{
            picked:{
                [Op.eq]: null,
            },
            code:{
                [Op.ne]:body.code
            },
            role:{
                [Op.ne]:'Admin'
            }
        }
    })
    const payload = {
        code:body.role
    }
    const token = jwt.sign(payload,process.env.SECRETEKEY,{
        expiresIn:'1h'
    })
    res.setHeader('Authorization',token)
    res.status(200).json({
        uid:body.code,
        users:{
            findall
        }
    })
})