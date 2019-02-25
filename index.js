const express = require('express')
const fs = require('fs')

const cookieParser = require('cookie-parser')
const multer = require('multer')

const usrouter = require('./logic/User')
const prodrouter=require('./logic/Product')

const app = express();

var hmap = {};

app.use( cookieParser() );
app.use( express.static('./public_html') );

app.use('/users' , usrouter);
app.use('/product', prodrouter);

app.use('/*' , (req,res,next)=>{
    console.log(req.cookies); 
    next();
});


app.get('/' , (req,res)=>{
    res.redirect('/login.html');
});

app.listen(3000,()=>{
    console.log("Listening at port 3000");
});