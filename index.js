const express=require('express')
const app=express();
require('dotenv').config();
require('express-async-errors');
const ConnectDB=require('./db/connect')

const port=process.env.PORT || 3001

const ProductRoutes=require('./routes/ProductRoutes')




app.use(express.json())
app.use('/api/v1/products',ProductRoutes)


const start=async()=>{
    try{
        await ConnectDB()
        app.listen(port,()=>{
            console.log(`Server Listen on Port ${port}`)
        })
    }catch(err){
        console.log(err)
    }
}
start()
