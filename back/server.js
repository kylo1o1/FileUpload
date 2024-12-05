const app = require("./app");
const env =require("dotenv");
const dataBaseConnection = require("./connection");

env.config()
dataBaseConnection()

app.listen(process.env.PORT,()=>{
    console.log('Running....')
})