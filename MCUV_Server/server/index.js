let express = require('express')
const path = require('path')

let dbPromise = require('../db/index')

let descriptionModel = require('../model/descriptionModel')
let profileModel = require('../model/profileModel')
let alterEgoModel = require('../model/alterEgoModel')
let movieModel = require('../model/movieModel')
let relationshipModel = require('../model/relationshipModel')

let incidentModel = require('../model/incidentModel')
let tracePointModel = require('../model/pointModel')
let shootingLocationModel = require('../model/locationModel')

let app = express()

app.disable('x-powered-by')

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});


dbPromise.then(() => {

    app.get('/',(request,response) => {
        response.send(request.query)
    })

    app.get('/api',(request,response) => {
        response.sendFile(path.join(__dirname,'./public/intro.html'))
    })

    app.get('/api/profile',(request,response) => {
        profileModel.find(request.query,(err,data) => {
            console.log(request.query);
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/description',(request,response) => {
        descriptionModel.find(request.query,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/alterego',(request,response) => {
        alterEgoModel.find(request.query,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/movie',(request,response) => {
        movieModel.find(request.query,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/relationship',(request,response) => {
        relationshipModel.find(request.query,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/Incident',(request,response) => {
        incidentModel.find(request.query,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/TracePoint',(request,response) => {
        tracePointModel.find(request.query,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/ShootingLocation',(request,response) => {
        shootingLocationModel.find(request.query,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/IncidentChange',(request,response) => {
        let select = {}
        let update = {}
        select['_id'] = request.query._id
        update['enable_flag'] = request.query.enable_flag
        incidentModel.updateOne(select,update,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/TracePointChange',(request,response) => {
        let select = {}
        let update = {}
        select['_id'] = request.query._id
        update['enable_flag'] = request.query.enable_flag
        tracePointModel.updateOne(select,update,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.get('/api/ShootingLocationChange',(request,response) => {
        let select = {}
        let update = {}
        select['_id'] = request.query._id
        update['enable_flag'] = request.query.enable_flag
        shootingLocationModel.updateOne(select,update,(err,data) => {
            if(!err){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    })

    app.post('/addData/addIncident',(request,response) => {
        let incident = request.body
        console.log(request.body);
        // response.send(request.body)
        incidentModel.create({
            name:incident.name,
            description:incident.description,
            positionX : incident.posX,
            positionY:incident.posY
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
                response.send(true)
            }else {
                console.log(err);
                response.send(false)
            }
        })
    })

    app.post('/addData/addTracePoint',(request,response) => {
        let point = request.body
        console.log(request.body);
        tracePointModel.create({
            name:point.name,
            description:point.description,
            location:point.location,
            movie:point.movie,
            time:point.time,
            positionX : point.posX,
            positionY:point.posY
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
                response.send(true)
            }else {
                console.log(err);
                response.send(false)
            }
        })
    })

    app.post('/addData/addShootingLocation',(request,response) => {
        let location = request.body
        console.log(request.body);
        shootingLocationModel.create({
            name:location.name,
            description:location.description,
            plot:location.plot,
            positionX : location.posX,
            positionY:location.posY
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
                response.send(true)
            }else {
                console.log(err);
                response.send(false)
            }
        })
    })

}).catch((err) => {
    console.log(err);
})

app.listen(8088,(err) => {
    if(!err) console.log('服务启动成功,端口8088');
    else console.log(err);
})