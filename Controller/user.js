const { where } = require('sequelize');
const userdb = require('../Model/user');
const asyncwrap = require('../Utility/asyncwrapper')

exports.getuser = asyncwrap(async (req,res,next)=>{
    const users = await userdb.findAll();
    res.status(200).json({
        success:true,
        data:{
            users
        }
    })
}) 

exports.postuser = asyncwrap( async (req,res,next)=>{
    const body = req.body
    body.role = 'User'
    await userdb.create(body)
    const users = await userdb.findAll()
    res.status(200).json({
        success:true,
        data:{
            users
        }
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
    const users = await userdb.findAll()

    await user.save()
    res.status(200).json({
        success:true,
        data:{
            users
        }
    })
})

exports.delete = asyncwrap(async(req,res,next)=>{
    const id = req.params.id;
    await userdb.destroy({
        where:{
            uid:id
        }
    })
    const users = await userdb.findAll()
    res.status(200).json({
        success:true,
        data:{
            users
        }
    })
})