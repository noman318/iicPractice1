const express = require ("express");
const mongoose = require ("mongoose");
const mongoDb = require ('mongodb');
const port = 4000;

const app = express();

const url = 'mongodb://localhost:27017/IIC-DEMO'

mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

con.on('open',()=>{
    console.log('DB connected...')
})

// const projectRouter = require('./routes/routes.js')
app.use(express.json())

const projectRouter = require ('./routes/ProjectRoutes')
app.use('/api/', projectRouter)

const versionRouter = require('./routes/VersionRoutes')
app.use('/api/version/', versionRouter)


// TEST of API

app.get('/',(req, res)=>{
    console.log('api at its ROOT ')
})


app.listen(port ,()=>{
    console.log(`app is listening on PORT ${port}`)
})