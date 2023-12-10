const mongoose=require('mongoose');

//Schema for registration 
const collectionSchema=mongoose.Schema({
    collectionname:{
        type:String,
        required:true,
        unique:true
    },
    language:{
        type:String,
        required:true,
        default:'English'
    }
});

const model=new mongoose.model('CollectionModel',collectionSchema);

module.exports=model;