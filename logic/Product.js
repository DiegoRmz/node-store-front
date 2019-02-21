const fs = require('fs')
const router = require('express').Router

const multer = require('multer')
const axios = require('axios')

const formUpload = multer({dest:'./temp'});

//Add product
router.post('/create',
    formUpload.fields([
        {name:'barcode',maxCount:1},
        {name:'name',maxCount:1},
        {name:'description',maxCount:1},
        {name:'quantity',maxCount:1},
        {name:'type',maxCount:1},
        {name:'photo',maxCount:1}
    ]),
    (req,res,next)=>{
        
        if(!fs.existsSync("./public_html/img/upload/products/")){
            fs.mkdirSync("./public_html/img/upload/products/"); 
        }

        fs.renameSync(req.files["photo"][0].path , "./public_html/img/upload/products/"+req.files["photo"][0].originalname);

        let finalUrl = "./public_html/img/upload/products/"+req.files["photo"][0].originalname;

        let payload = {
            barcode: req.body.barcode,
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            type: req.body.type,
            photo: finalUrl
        }

        //Here it tries to post the data
        axios.post('http://localhost:3000/product/new',{sid:"BASTION",payload:payload})
        .then(success=>{
            res.send(success);
        }).catch(err=>{
            res.status(500).send(err);
        })
    }
)

//Modify product
router.post('/update-or-alter-inv',
    formUpload.fields([
        {name:'barcode',maxCount:1},
        {name:'name',maxCount:1},
        {name:'description',maxCount:1},
        {name:'quantity',maxCount:1},
        {name:'type',maxCount:1},
        {name:'photo',maxCount:1}
    ]),
    (req,res)=>{
        if(!fs.existsSync("./public_html/img/upload/products/")){
            fs.mkdirSync("./public_html/img/upload/products/"); 
        }

        fs.renameSync(req.files["photo"][0].path , "./public_html/img/upload/products/"+req.files["photo"][0].originalname);

        let finalUrl = "./public_html/img/upload/products/"+req.files["photo"][0].originalname;

        let payload = {
            barcode: req.body.barcode,
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            type: req.body.type,
            photo: finalUrl
        }

        //Here it tries to post the data
        axios.post('http://localhost:3000/product/update',{sid:"BASTION",payload:payload, query:{barcode: payload.barcode}})
        .then(success=>{
            res.send(success);
        }).catch(err=>{
            res.status(500).send(err);
        })
    }
)

router.get('/products',(req,res)=>{
    axios.post('http://localhost:3000/product/get-many',{sid:"BASTION"})
    .then(success=>{
        res.json(success);
    }).catch(err=>{
        res.status(500).send(err);
    })
})

module.exports = router;