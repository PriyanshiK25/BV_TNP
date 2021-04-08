const mongoose=require("mongoose");

const drive=new mongoose.Schema({
   
    company_name:{
        type:String
    },
    position:
    {
        type:String
    },
    type:
    {
        type:String
    },
    link:
    {
        type:String

    }
    

})

const Drive = new mongoose.model("Drive",drive);

module.exports = Drive