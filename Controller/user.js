const { where } = require('sequelize');
const userdb = require('../Model/user');
const asyncwrap = require('../Utility/asyncwrapper')

exports.getuser = asyncwrap(async (req,res,next)=>{
    const user = await userdb.findAll();
    res.status(200).json({
        success:true,
        data:{
            user
        }
    })
}) 

exports.postuser = asyncwrap( async (req,res,next)=>{
    const body = req.body
    body.role = 'User'
    await userdb.create(body)
    const user = await userdb.findAll()
    res.status(200).json({
        success:true,
        data:{
            user
        }
    })
})

exports.edituser = asyncwrap(async(req,res,next)=>{
    const body = req.body;
    const id = req.params.id
    const users = await userdb.findOne({
        where:{
            uid:id
        },
        attributes:['name','code','uid']
    })
    if(body.name){
        users.name = body.name;
    }
    if(body.code){
        users.code = body.code;
    }
    const user = await userdb.findAll()

    await user.save()
    res.status(200).json({
        success:true,
        data:{
            user
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
    const user = await userdb.findAll()
    res.status(200).json({
        success:true,
        data:{
            user
        }
    })
})