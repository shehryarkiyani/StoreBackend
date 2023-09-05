const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name is Required"]
    },
    price:{
        type:Number,
        required:[true,"Product Price is Required"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','careesa','marcos'],
            message:'{VALUE} is not supported'
        }
    }
})

module.exports=mongoose.model('Products',ProductSchema)