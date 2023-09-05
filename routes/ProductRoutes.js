const express=require('express')
const router=express.Router()
const {GetAllProduct,GetSingleProduct,CreateProduct,UpdateProduct,DeleteProduct} = require('../controllers/ProductControllers')


router.get('/',GetAllProduct)
router.get('/:id',GetSingleProduct)
router.post('/',CreateProduct)
router.patch('/:id',UpdateProduct)
router.delete('/:id',DeleteProduct)





module.exports=router