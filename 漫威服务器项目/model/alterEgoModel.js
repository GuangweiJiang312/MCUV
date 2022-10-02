let mongoose = require('mongoose')

//引入约束
let Scheme = mongoose.Schema

//创建一个约束对象实例
let alterEgoScheme = new Scheme({
    id:{
        type: String,
        required: true
    },
    movie_involved:{
        type:Object,
    },
    name:{
        type: String,
    },
    origin_id:{
        type: String,
    },
    enable_flag:{
        type:String,
        default: 'Y'
    }
})

//创建模型对象
let alterEgoModel = mongoose.model('alterEgo',alterEgoScheme)

module.exports = alterEgoModel