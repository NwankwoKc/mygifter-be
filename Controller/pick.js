const asyncwrap = require('../Utility/asyncwrapper')
const userdb = require('../Model/user');
const { where } = require('sequelize');


exports.picked = asyncwrap(async (req,res,next)=>{
    const userId = req.body.code;
    const picked = req.body.pickedid;

    const user = await userdb.findOne({
        where:{
            code:userId
        },
        attributes:['picked','uid']
    })
    if(user){
        const users = await userdb.findOne({
            where:{
                code:picked
            },
            attributes:['picked','uid']
        })
        users.picked = userId;
        users.save()
    }
    const pc = await userdb.findOne({
        where:{
            code:picked
        }
    })
    res.status(200).json({
        data:pc,
        message:'success'
    })
})