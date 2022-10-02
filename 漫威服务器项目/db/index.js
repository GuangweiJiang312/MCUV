let mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

const DB_ADDRESS = 'localhost:27017'
const DB_NAME = 'marvelProfileNew'

//连接数据库
let dbPromise = new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${DB_ADDRESS}/${DB_NAME}`,{ useNewUrlParser: true ,useUnifiedTopology: true})

    mongoose.connection.on('open',(err) => {
        if(err){
            reject(err)
        }else {
            console.log('数据库连接成功');
            resolve()
        }
    })
})

module.exports = dbPromise

