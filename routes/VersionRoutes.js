const express = require("express");
const multer  = require('multer')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
// const upload = multer({ dest: 'uploads/versions' })

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb){
//             cb(null, 'uploads/versions/v1')
//             console.log('mmmmmmmmmmm')
//         },
//         filename: function(req,file, cb){
//             let ext = mime.extension(file.mimetype)
//             cb(null, file.filename+"-"+Date.now()+'.'+ ext)
//             console.log(ext)
//         }
//     })
// }).array('user_files',8)
let v=0
const upload = multer({
    storage: multer.diskStorage({
            destination: function(req, file, cb){
                fs.mkdir(path.join(__dirname, "..", `/uploads/versions/`, `v${v}`), { recursive: true }, (err) => {
                    if (err) throw err;
                    });

                cb(null, `uploads/versions/v${v}`)
                console.log('mmmmmmmmm')
            },
            filename: function(req,file, cb){
                let ext = mime.extension(file.mimetype)
                cb(null, file.filename+"-"+Date.now()+'.'+ ext)
                console.log(ext)
            }
        })
    
}).array('user_files',8)

const router = express.Router()

const app = express();

    router.get('/', async(req,res)=>{
        try {
            res.json('Version route')
        } catch (error) {
            console.log(error)
        }
    })

    router.post('/',(req, res, next) => {
        v++;
        next()
    }, upload,(req, res)=> {
        // for (let v=1; v<a; v++){
            // console.log(req.files)
                // console.log(v)
            // }
            res.send('Files uploaded in version')
      })

module.exports = router
