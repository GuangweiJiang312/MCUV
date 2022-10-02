let mongoose = require('mongoose')

//引入约束
let Scheme = mongoose.Schema

//创建一个约束对象实例
let profileScheme = new Scheme({
    id:{
        type: String,
        required: true
    },
    affiliation:{
        type:Object,
        required:true
    },
    alias:{
        type:String
    },
    full_name:{
        type:String
    },
    has_alter_ego:{
        type:Boolean,
        default: false
    },
    played_by:{
        type:String,
        required:true
    },
    species:{
        type:String,
    },
    status:{
        type:String,
    },
    movies:{
        type:Object
    },
    type:{
        type:String,
    },
    name:{
        type:String,
    },
    enable_flag:{
        type:String,
        default: 'Y'
    }
})

//创建模型对象
let profileModel = mongoose.model('characterProfile',profileScheme)

module.exports = profileModel