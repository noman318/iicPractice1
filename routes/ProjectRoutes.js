const express = require("express");
const multer  = require('multer')
const mime = require('mime-types')
const Project = require("../models/Project");

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'uploads')
        },
        filename: function(req,file, cb){
            let ext = mime.extension(file.mimetype)
            cb(null, file.filename+"-"+Date.now()+'.'+ ext)
            console.log(ext)
        }
    })
}).single('user_file')

const router = express.Router()

const app = express();
    router.get('/', async(req,res)=>{
        try {
            const project = await Project.find()
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    })

    router.post('/', async(req, res)=>{
        const project= new Project({
            name: req.body.name,
        })
        try {
            const project1 = await project.save()
            res.json(project1)
        } catch (error) {
            console.log(error)
            res.send('Error...')
        }
    })

    router.post('/upload', upload ,(req, res) => {
        res.send('File uploaded')
    })

module.exports = router