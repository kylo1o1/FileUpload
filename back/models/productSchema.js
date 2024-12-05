const { default: mongoose, mongo } = require("mongoose");


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter products name"]
    },
    category:{
        type:String,
        required:[true,"Please enter products category"]
    },
    description:{
        type:String,
        required:[true,"Please enter products description"]
    },
    price:{
        type:String,
        required:[true,"Please enter products price"]
    },
    image:{
        type:[String],
        required:[true,"Please enter products image"]
    }
})


const Products = mongoose.model('product',productSchema)

module.exports = Products