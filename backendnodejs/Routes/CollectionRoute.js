const express=require('express');
const router=express.Router();
const collectionModel=require('../Models/collectionmodel.js');

const checkCollection=(req,res,next)=>{
    const body=req.body;
    if(!body)
    {
        res.json('No details found!');
        return;
    }
    req.bodystore=body;
    next();
}

//Collection DB data stores
router.post('/',checkCollection,async (req,res)=>{
    const body=req.bodystore;
    try
    {
        const user=await collectionModel.create(body);
        res.json('Collection Saved!');
    }
    catch(exp)
    {
        res.json('Collection already present!');
    }
})

//Collection find
router.get('/find',async (req,res)=>{
    try
    {
        const collections=await collectionModel.find({});
        const collectionnames=[];
        collections.forEach(element => {
           collectionnames.push(element.collectionname);
          });
        res.json(collectionnames);
    }
    catch(exp)
    {
        res.json('Unable to find data!');
    }
});
module.exports=router;