
const express =require("express");
const app = express();
const path =require("path");
const hbs=require("hbs");
const ejs=require("ejs");
const socketio = require('socket.io');
const http=require('http');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
//var upload = multer()
require("./db/conn");

//require("C:/tejaswini_dashboard/dashboard/mernbackend/bvconnect/server");
const Register = require("./models/registers");
const CRegister = require("./models/cregisters");
const Detail = require("./models/details");
const Announce = require("./models/announce");
const Placement=require("./models/placement");
const Drive=require("./models/drive");
const Resume = require("./models/resume");
const Aptitude = require("./models/aptitude");
var resu=Resume.find({});
var aptit=Aptitude.find({});
//const { Resolver} = require("dns");
const{json}=require("express");
const { RSA_NO_PADDING } = require("constants");
const port = process.env.PORT || 8000;

const static_path=path.join(__dirname, "../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
//const server_path=path.join("C:/tejaswini_dashboard/dashboard/mernbackend/bvconnect/server ");


////admin bro//////
const adminRouter=require('./routers/admin.router')
//const registersRouter= require('./routers/registers.router')
//app.use('/users',registersRouter)
app.use('/admin',adminRouter)

///////////////////////////////////////////////////////////

//////////////fetch////////



//const detailFetch=require('./models/details')



////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

//app.use(express.static('views/images')); 

app.get("/",(req,res)=> {
    res.render("index.hbs")
});
app.get("/register",(req,res)=>
{
    res.render("register.hbs"); 
})
////company register
app.get("/cregister",(req,res)=>
{
    res.render("cregister.hbs"); 
})
app.post("/cregister",async(req,res)=>{
    try {
        const password = req.body.pass;
        const cpassword = req.body.re_pass;

        if(password === cpassword ){
            const companyReg = new CRegister({
                username:req.body.username,
                email:req.body.email,
                pass:req.body.pass,
                re_pass:req.body.re_pass

            })

            const registered = await companyReg.save();
            res.status(201).render("index.hbs");
      

        }else{
            res.send("Your password is incorrect");
        }

    } catch (error) {
    res.status(400).send(error);
    }

})
///company login
app.get("/clogin",(req,res)=>
{
    res.render("clogin.hbs"); 
})
//
app.post("/clogin",async(req,res)=>
{
try {
    const email=req.body.your_name;
    const password=req.body.your_pass;

    const check_email= await CRegister.findOne({email:email});
   // console.log(check_email.pass);
   // console.log(password);
   if(check_email.pass===password)
    {
        res.status(201).render("index.hbs");
    }
    else
    {
        res.send("chutiye ho kya tumhara nhi hai to kyu marne aaye ho yha");
    }

} catch (error) {
    res.status(400).send("invalid login details");
}
})
app.get("/login",(req,res)=>
{
    res.render("login.hbs"); 
})

app.post("/register",async(req,res)=>{
    try {
        const password = req.body.pass;
        const cpassword = req.body.re_pass;

        if(password === cpassword ){
            const studentReg = new Register({
                username:req.body.username,
                email:req.body.email,
                pass:req.body.pass,
                re_pass:req.body.re_pass

            })

            const registered = await studentReg.save();
            res.status(201).render("login.hbs");
      

        }else{
            res.send("Chutiye ho kya password bhi nhi shi daal pa rhe")
        }

    } catch (error) {
    res.status(400).send(error);
    }

})
app.post("/login",async(req,res)=>
{
try {
    const email=req.body.your_name;
    const password=req.body.your_pass;

    const check_email= await Register.findOne({email:email});
   // console.log(check_email.pass);
   // console.log(password);
   if(check_email.pass===password)
    {
     res.status(201).render("slogin.hbs");
    }
    else
    {
        res.send("chutiye ho kya tumhara nhi hai to kyu marne aaye ho yha");
    }

} catch (error) {
    res.status(400).send("invalid login details");
}
})

app.get("/slogin",(req,res)=> {
    res.render("slogin.hbs")
});


app.get("/detail",(req,res)=> {
    res.render("detail.hbs")
});

//////multer.//////



////////multer upload/////////


app.post("/detail",async(req,res)=>{
    try {
        //console.log(req.body.Fname);
        //res.send(req.body.Fname);
       
            const studentDetails = new Detail({
                
                Fname:req.body.Fname,
                Lname:req.body.Lname,
                //usn:req.body.usn,
                Num:req.body.Num,
                Email:req.body.Email,
                dob:req.body.dob,
                Cursem:req.body.Cursem,
                Branch:req.body.Branch,
                Percentage:req.body.Percentage,
                Puagg:req.body.Puagg,
                Beagg:req.body.Beagg,
                Backlogs:req.body.Backlogs,
                History:req.body.History,
             

    });
 
        const registerD = await studentDetails.save();
        res.status(201).render("login.hbs");

    } catch (error) {
    res.status(400).send(error);
    }

})

/////FETCHING DATA /////////*
app.get("/fetch",(req,res)=> 
{
    Detail.find({},function(err,details){
        res.render("user-table.ejs",{
            detailList:details
        })
    })
})
app.get("/announce",(req,res)=>
{
    Announce.find({},function(err,announce){
        res.render("announce.ejs",{

            announceList:announce
        })
})
})
app.get("/placement",(req,res)=>
{
    Placement.find({},function(err,placement){
        res.render("placement.ejs",{
            placementList:placement
        })
    })
})

app.get("/placementdrive",(req,res)=>
{
    Drive.find({},function(err,drive){
        res.render("placementdrive.ejs",{
            driveList:drive
        })
    })
})



  
app.get("/material",(req,res)=>
{
    res.render("material.ejs");
});


app.get("/mat",(req,res)=>
{
    res.render("mat.ejs");
});

/////////////////////////////////    UPLOAD   ////////////////////////////////
/*const storageA = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/resume')
    },
  })
  
  const storageB = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/aptitude')
    },
  })
  
  const destA = multer({ storage: storageA })
  const destB = multer({ storage: storageB })
  
  function fileUpload(req, res, next) {
    destA.single('resume')(req, res, next);
    destB.single('apti')(req, res, next);
    next();
  }
  
  app.post("/", fileUpload, (req, res) => {
    res.send("Received file");
  });

*/




/*var storageA= multer.diskStorage({
    destination:"./public/uploads/resume",
    filename: (req, file, cb)=>
    {
      cb(null, file.fieldname + "_" + Date.now()+path.extname(file.originalname));
    }
  });
  
  var uploadA = multer({ 
      storage: storageA }).single('resume');

*/

var assign = multer.diskStorage({
    destination:function(req,file,cb){
   const dir=`./public/uploads/`+file.fieldname;
   if(file.fieldname === `resume`){
     cb(null,dir);
    }else if(file.fieldname=== `aptitude`){
     cb(null,dir);
    }
    /*
    else if(file.fieldname===”Assign3"){
     cb(null,dir);
    }else if(file.fieldname===”Assign4"){
     cb(null,dir);
    }else if(file.fieldname===”Assign5"){
     cb(null,dir);
    }*/
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
  });
  
  var upload = multer({storage: assign});

app.post('/material',upload.any(), function (req, res, next) {
   var FileA=req.file.filename;
    var fileDetails=new Resume({
        resume:FileA 

  });
    fileDetails.save(function(err,doc)
    {})
    });
   
    

    app.get("/resume",(req,res)=>{ resu.exec(function(err,data){
        if(err) throw err;
    res.render("resume.ejs",{title:'Upload File',rec:data}); 
    });

})



/*
var storageB = multer.diskStorage({
    destination:"./public/uploads/aptitude",
    filename: (req, file, cb)=>
    {
      cb(null, file.fieldname + "_" + Date.now()+path.extname(file.originalname));
    }
  });
  
  var uploadB = multer({ 
      storage: storageB }).single('aptitude');

*/
    app.post('/material',upload.any(), function (req, res, next) {
    var FileB=req.file.filename;
    var fileDetails=new Aptitude({
        apti:FileB 

    });
    fileDetails.save(function(err,doc)
    {})
    });
   
    app.get("/aptitude",(req,res)=>{ aptit.exec(function(err,data){
        if(err) throw err;
    res.render("aptitude.ejs",{title:'Upload File',aptit:data}); 
    });
    });

///////////////////////////////////////////////////////////// CX
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})