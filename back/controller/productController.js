const Products = require("../models/productSchema")
const fs = require('fs')

exports.registerProduct = async (req,res) => {
    const {name,category,description,price} = req.body
    console.log(req.files)
    if(
        !name ||
        !category ||
        !description ||
        !price 
    ){
        res.status(400).json({
            success:false,
            message:"Please enter all fields"
        })
    }
    
    const _imgs = req.files.map(file => {
        return file.path
    });

    try {

        const _newProduct = await Products.create({
            name,category,description,price,
            image:_imgs
        })


        if(!_newProduct){
            return res.status(500).json({
                success:false,
                message:"Internal ERROR || Product Registration Failed"
            })
        }

        return res.status(201).json({
            success:true,
            message:"Product register successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "Internal ERROR"
        })
    }
}
exports.viewProducts = async (req,res) => {
    try {
        const products = await Products.find()

        if(!products){
            return res.status(404).json({
                success:false,
                message:"No Products Found"
            })
        }

        return res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "Internal ERROR"
        })
    }
}

exports.editProduct = async (req,res) => {
    
    try {
        const {name,    category,   description,    price,  files} = req.body
        const {id} = req.params
        const _prod = await   Products.findById(id)

        if(!_prod){
            return res.status(404).json({
                success:false,
                message:"Product Found"
            })
        }

        if(name)    _prod.name = name;
        if(category)    _prod.category = category;
        if(description)     _prod.description = description;
        if(price)   _prod.price     =   price;

        if(files){
              const rmPath = _prod.image.filter((e)=> !files.includes(e))
              rmPath.forEach((path)=>{
                if(fs.existsSync(path)){

                    fs.unlinkSync(path)
                    console.log(`File Removed ${path}`)
                }
            })
            const newPaths = _prod.image.filter((e)=> files.includes(e))
            _prod.image = newPaths
        }

        if(req.files){
            req.files.forEach(file => {
                _prod.image.push(file.path)
            });
        }
        
        

        console.log(_prod.image)
        _prod.save()

        res.status(200).json({
           success:true, 
           message:"Product Uploaded",
           newProduct :_prod
        })
       

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "INTERNAL ERROR"
        })
    }
}

exports.deleteProduct =  async (req,res) => {
    try {
        const   {id} = req.params
        
        const product  = await Products.findById(id)

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        product.image.forEach(path => {
            if(fs.existsSync(path)){
                fs.unlinkSync(path)
            }
        });
        product.image = []

        
        const dlt = await Products.findByIdAndDelete(id)
        

        return res.status(200).json({
            success:true,
            message:"Product Deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "Internal Error"
        })
    }
}