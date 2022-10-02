let mongoose = require('mongoose')

//引入约束
let Scheme = mongoose.Schema

//创建一个约束对象实例
let movieScheme = new Scheme({
    group_id:{
        type: String,
        required: true
    },
    group_name:{
        type:String,
    },
    id:{
        type: String,
    },
    index:{
        type: String,
    },
    name:{
        type: String,
    },
    phase:{
        type: String,
    },
    released:{
        type: String,
    },
    year:{
        type: String,
    },
    enable_flag:{
        type:String,
        default: 'Y'
    }
})
//创建模型对象
let movieModel = mongoose.model('movie',movieScheme)
module.exports = movieModel