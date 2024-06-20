const asyncwrap = require('../Utility/asyncwrapper')
const userdb = require('../Model/user');
const { where } = require('sequelize');


exports.picked = asyncwrap(async (req,res,next)=>{
    const userId = req.body.userid;
    const picked = req.body.pickedid;

    const user = await userdb.findOne({
        where:{
            userid:userId
        },
        attributes:['picked','uid']
    })
    if(user){
        user.picked = picked;
        user.save()
    }
    const pc = await userdb.findOne({
        where:{
            userid:picked
        }
    })
    res.status(200).json({
        data:pc,
        message:'success'
    })
})