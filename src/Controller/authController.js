const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")



const userRegister = async (req,res) => {
    const {email , name , password} = req.body
    const isExists = await userModel.findOne({
        email
    })
    if(isExists){
        return res.status(422).json({
            message : "User already exists with this email",
            status : "failed"
        })
    }
    const createdUser = await userModel.create({
        email , name , password
    })
    const token = jwt.sign({userId : createdUser._id},process.env.JWT_SECRET_KEY,{expiresIn : "3d"})
    res.cookie("token",token)
    res.status(201).json({
        user: {
            userId : createdUser._id,
            userEmail : createdUser.email,
            userName : createdUser.name,
        },
        token 
    })
}

module.exports = {
    userRegister
}