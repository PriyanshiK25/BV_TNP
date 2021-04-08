const mongoose=require("mongoose");

const resume=new mongoose.Schema({
   
    resume:{
        type:String
    }
})

const Resume = new mongoose.model("Resume",resume);

module.exports = Resume;