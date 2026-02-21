const mongoose = require("mongoose")

const connectToDb =  () => {
   
    mongoose.connect(process.env.Mongo_URI)
    .then(()=>{
        console.log("Connected to database")
    })
    .catch((err)=>{
        console.log("Error connecting to DB",err)
        process.exit(1)
    })
}

module.exports = connectToDb