const Product=require('../Models/ProductModel')

const GetAllProduct=async(req,res)=>{
   let {featured,company,name,sort,fields,limit,page,filters}=req.query
   let queryObject={}
   if(featured){
    queryObject.featured=featured==='true'?true:false
   }
   if(company){
    queryObject.company=company
   }
   if(name){
    queryObject.name={$regex:name,$options:'i'}
   }
   if(filters){
    let operatorMap={
        '>':'$gt',
        '<':'$lt',
        '>=':'$gte',
        '<=':'$lte',
        '=':'$eq'
    }
    const regex=/\b(<|>|<=|>=|=)\b/g
    let numFilter=filters.replace(regex,(match)=>`-${operatorMap[match]}-`)
    const options=['price','rating']
    numFilter=numFilter.split(",").forEach((item)=>{
        const [field,operator,value]=item.split("-")
        if(options.includes(field)){
            queryObject[field]={[operator]:Number(value)}
        }
    })
}
let results= Product.find(queryObject)
if(sort){
    let sortList=sort.split(",").join(" ")
    
    results= results.sort(sortList)
}
if(fields){
    let selectList=fields.split(",").join(" ")
    results=results.select(selectList)
}


let Page=Number(page) ||1
let Limit=Number(limit)||10 
let skip=(Page-1)*Limit

results=results.skip(skip).limit(Limit)

let products=await results
if(!products){
    return res.status(401).json({msg:"no products found"})
}
return res.status(200).json({products,success:true,total:products.length})
}
const GetSingleProduct=async(req,res)=>{
   
    let products=await Product.findById({_id:req.params.id})
if(!products){
    throw  Error(`no products found with id ${req.params.id}`)
}
return res.status(200).json({products,success:true})

}
const CreateProduct=async(req,res)=>{
    let product=await Product.create(req.body)
    return res.status(200).json({product,success:true})
}
const UpdateProduct=async(req,res)=>{
    let product=await Product.findByIdAndUpdate({_id:req.params.id},req.body,{
        new:true,
        runValidator:true
    })
    return res.status(200).json({product,success:true})
}
const DeleteProduct=async(req,res)=>{
    let products=await Product.findOneAndDelete({_id:req.params.id})
if(!products){
    throw  Error(`no products found with id ${req.params.id}`)
}
return res.status(200).json({products,success:true})

}
module.exports={
    GetAllProduct,
    GetSingleProduct,
    CreateProduct,
    UpdateProduct,
    DeleteProduct
}