const asyncwrapper = require('../Utility/asyncwrapper')
const db = require('../Model/user');
const { where, Op } = require('sequelize');
const { picked } = require('./pick');


exports.login = asyncwrapper(async (req,res,next)=>{
    const body = req.body;

    let auth = await db.findOne({
        where:{
            userid: body.userid
        },attributes:['userid','picked']
    })
    if(!auth){
        return res.status(401).json({
            message:'userID does not exist'
        })
    }
    const userId = auth.getDataValue('userid')
    const pc = auth.getDataValue('picked');
    
    //if the individual has already picked before
    if(pc !==null){
        const dt = await db.findOne({
            where:{
                picked:pc
            }
        })
        return res.status(200).json({
            data:dt
        })
    }

    //if the individual has not picked at all it gets all the users that have not been picked 
    let findall = await db.findAll({
        where:{
            picked:{
                [Op.eq]: null,
            },
            userid:{
                [Op.ne]:userId
            }
        }
    })

    res.status(200).json({
        uid:body.userid,
        data:findall
    })
})