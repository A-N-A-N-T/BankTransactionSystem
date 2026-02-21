require("dotenv").config()
const app = require("./src/index")
const dbConnection = require("./src/config/db")


dbConnection()

app.listen(3000,()=>{
    console.log("Server start at 3000")
})