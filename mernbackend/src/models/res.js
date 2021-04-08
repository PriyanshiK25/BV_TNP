const express =require("express");
const app = express();
const path =require("path");
//const hbs=require("hbs");
//const ejs=require("ejs");
//const socketio = require('socket.io');
const http=require('http');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
//var upload = multer();

const Resume = require("./resume");
//const Aptitude = require("./models/aptitude");
var resu=Resume.find({});
//var aptit=Aptitude.find({});

var storageA= multer.diskStorage({
    destination:"./public/uploads/resume",
    filename: (req, file, cb)=>
    {
      cb(null, file.fieldname + "_" + Date.now()+path.extname(file.originalname));
    }
  });
  
  


    