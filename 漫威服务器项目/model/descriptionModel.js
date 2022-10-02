let mongoose = require('mongoose')

//引入约束
let Scheme = mongoose.Schema

//创建一个约束对象实例
let descriptionScheme = new Scheme({
    id:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    enable_flag:{
        type:String,
        default: 'Y'
    }
})

//创建模型对象
let descriptionModel = mongoose.model('descriptionProfile',descriptionScheme)

module.exports = descriptionModel