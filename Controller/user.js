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