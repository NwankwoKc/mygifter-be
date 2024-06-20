const asyncwrapper = require('../Utility/asyncwrapper')
const db = require('../Model/user');
const { where, Op } = require('sequelize');
const { picked } = require('./pick');


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
            data:ck
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

    res.status(200).json({
        uid:body.code,
        data:findall
    })
})