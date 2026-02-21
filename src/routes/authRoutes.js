const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const { userRegister } = require("../Controller/authController")



router.post("/register",userRegister)



module.exports = router