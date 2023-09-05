
require('dotenv').config();

const ConnectDB=require('./db/connect')

const Product=require('./Models/ProductModel')
const jsonProducts=require('./product.json')
const start=async()=>{
    try{
        await ConnectDB()
        await Product.deleteMany()
       await Product.create(jsonProducts)
       console.log("Success")
    }catch(err){
        console.log(err)
    }
}
start()
