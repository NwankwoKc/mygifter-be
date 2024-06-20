const { where } = require('sequelize');
const userdb = require('../Model/user');
const asyncwrap = require('../Utility/asyncwrapper')

exports.getuser = asyncwrap(async (req,res,next)=>{
    const data = await userdb.findAll();
    res.status(200).json({
        data:data
    })
})

exports.postuser = asyncwrap( async (req,res,next)=>{
    const body = req.body
    await userdb.create(body)
    res.status(200).json({
        message:'success'
    })
})

exports.edituser = asyncwrap(async(req,res,next)=>{
    const body = req.body;
    const id = req.params.id
    const user = await userdb.findOne({
        where:{
            uid:id
        },
        attributes:['name','code','uid']
    })
    if(body.name){
        user.name = body.name;
    }
    if(body.code){
        user.code = body.code;
    }

    await user.save()
    res.status(200).json({
        message:"success"
    })
})

exports.delete = asyncwrap(async(req,res,next)=>{
    const id = req.params.id;
    await userdb.destroy({
        where:{
            uid:id
        }
    })
    res.status(200).json({
        message:"success"
    })
})