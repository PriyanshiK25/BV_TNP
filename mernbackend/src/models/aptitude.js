const mongoose=require("mongoose");

const aptitude=new mongoose.Schema({
   
    apti:{
        type:String
    },
    key:
    {
        type:String
    }
})

const Aptitude = new mongoose.model("Aptitude",aptitude);

module.exports = Aptitude;