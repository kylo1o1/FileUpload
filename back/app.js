const express = require('express')
const cors  =   require('cors')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

const cookieParser = require('cookie-parser')


const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:true,
}))

app.use('/uploads',express.static('Uploads'))



app.use(userRoutes)
app.use(productRoutes)

module.exports = app