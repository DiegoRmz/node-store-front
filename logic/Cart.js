const fs = require('fs')
const router = require('express').Router

const multer = require('multer')
const axios = require('axios')

const formUpload = multer({dest:'./temp'});


module.exports = router;