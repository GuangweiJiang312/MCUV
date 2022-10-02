let mongoose = require('mongoose')

//引入约束
let Scheme = mongoose.Schema

//创建一个约束对象实例
let tracePointScheme = new Scheme({
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    movie:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    positionX:{
        type:String,
        required:true
    },
    positionY:{
        type:String,
        required:true
    },
    enable_flag:{
        type:String,
        default: 'N'
    }
})

//创建模型对象
let tracePointModel = mongoose.model('tracePoint',tracePointScheme)

module.exports = tracePointModel