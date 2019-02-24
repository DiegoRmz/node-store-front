const fs = require('fs')
const router = require('express').Router

const multer = require('multer')
const axios = require('axios')

const formUpload = multer({dest:'./temp'});

//Login function
router.post('/login', formUpload.fields(
    [
        {name:'email',maxCount:1},
        {name:'password',maxCount:1}
    ]),
    (req,res,next)=>{
        let query = {email:req.body.email,password:req.body.password};

        axios.post('http://localhost:3000/User/get-one',{sid:"BASTION",query:query})
        .then(success=>{
            res.send(success);
        }).catch(err=>{
            res.status(500).send(err);
        })
    }
)

//Create a new user
router.post('/create', formUpload.fields(
        [
            {name:"name",maxCount:1},
            {name:"photo",maxCount:1},
            {name:"email",maxCount:1},
            {name:"password",maxCount:1},
            {name:"role",maxCount:1}
        ]    
    ),
    (req,res,next)=>{
        if(!fs.existsSync("./public_html/img/upload/users/"+req.body.email)){
            fs.mkdirSync("./public_html/img/upload/users/"+req.body.email); 
        }

        
        fs.renameSync(req.files["photo"][0].path , "./public_html/img/upload/users/"+req.body.email+req.files["photo"][0].originalname);

        let finalUrl = "./public_html/img/upload/users/"+req.body.email+req.files["photo"][0].originalname; //New route

        let payload = {
            name: req.body.name,
            photo: finalUrl,
            email:  req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        //Here it tries to post the data
        axios.post('http://localhost:3000/User/new',{sid:"BASTION",payload:payload})
        .then(success=>{
            res.send(success);
        }).catch(err=>{
            res.status(500).send(err);
        })
    }
)

//Update a user
router.post('/create', formUpload.fields(
    [
        {name:"name",maxCount:1},
        {name:"photo",maxCount:1},
        {name:"email",maxCount:1},
        {name:"password",maxCount:1},
        {name:"role",maxCount:1}
    ]    
    ),
    (req,res,next)=>{
        if(!fs.existsSync("./public_html/img/upload/users/"+req.body.email)){
            fs.mkdirSync("./public_html/img/upload/users/"+req.body.email); 
        }

    
        fs.renameSync(req.files["photo"][0].path , "./public_html/img/upload/users/"+req.body.email+req.files["photo"][0].originalname);

        let finalUrl = "./public_html/img/upload/users/"+req.body.email+req.files["photo"][0].originalname; //New route

        let payload = {
            name: req.body.name,
            photo: finalUrl,
            email:  req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        //Here it tries to post the data
        axios.post('http://localhost:3000User/update',{sid:"BASTION",payload:payload})
        .then(success=>{
            res.send(success);
        }).catch(err=>{
            res.status(500).send(err);
        })
    }
)

//Get many users
router.get('/users',(req,res)=>{
    axios.post('http://localhost:3000/User/get-many',{sid:"BASTION"})
    .then(success=>{
        res.json(success);
    }).catch(err=>{
        res.status(500).send(err);
    })
})
