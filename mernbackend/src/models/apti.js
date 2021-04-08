const express =require("express");
const app = express();
const path =require("path");
const hbs=require("hbs");
const ejs=require("ejs");
const socketio = require('socket.io');
const http=require('http');
var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' });
var upload = multer();

const Aptitude = require("./aptitude");
var aptit=Aptitude.find({});

var storageB = multer.diskStorage({
    destination:"./public/uploads/aptitude",
    filename: (req, file, cb)=>
    {
      cb(null, file.fieldname + "_" + Date.now()+path.extname(file.originalname));
    }
  });
  
  var uploadB = multer({ 
      storage: storageB }).single('aptitude');


 