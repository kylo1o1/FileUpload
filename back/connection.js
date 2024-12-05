const { default: mongoose } = require("mongoose")

const dataBaseConnection = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then((data)=>{
        console.log(`Connection Established with ${data.connection.host}`)
    })
    .catch(err=>{
        console.log(err.message)
    })
}

module.exports = dataBaseConnection