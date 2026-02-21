const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: [true,"Email is required for creating users"],
        trim : true,
        lowercase : true,
        match : [
           /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email"
        ],
        unique: [true,"Email is already Exist"]
    },
    name : {
        type: String,
        required : [true, "Name is required for registration"]
    },
    password : {
        type : String,
        required : [
            true,
            "Password is required for creating the account"
        ],
        minlength : [6,"Password should be of atleast 6 character long"],
        select : false // by doing this we can't get the password when we try to excess the data of a particular user
    }
},{
    timestamps : true
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return 
    }
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
    return 
})
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema)
module.exports = userModel