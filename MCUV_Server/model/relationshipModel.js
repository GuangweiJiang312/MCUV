let mongoose = require('mongoose')

//引入约束
let Scheme = mongoose.Schema

//创建一个约束对象实例
let relationshipScheme = new Scheme({
    id:{
        type: String,
        required: true
    },
    is_updated_relationship:{
        type:String,
    },
    movie_id:{
        type: String,
    },
    relationship:{
        type: String,
    },
    target_id:{
        type: String,
    },
    enable_flag:{
        type:String,
        default: 'Y'
    }
})

//创建模型对象
let relationshipModel = mongoose.model('relationship',relationshipScheme)

module.exports = relationshipModel