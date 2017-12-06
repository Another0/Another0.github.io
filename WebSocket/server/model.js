const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/websocket')

const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误：'));
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})

// 创建scheam
const userSchema = new mongoose.Schema({
    nickname: String,
    account: String,
    password: String,
    userId: Number,
    imgsrc: String
},{collection: "user"})

const contentSchema = new mongoose.Schema({
    name: String,
    content: String,
    time: String,
    imgsrc: String
},{collection: "contents"})

// 构建model实例
let User = mongoose.model('user',userSchema)
let Contents = mongoose.model('contents',contentSchema)

let userSave = function (obj, callback) {
    let user = new User(obj)
    user.save(function (err) {
        callback(err)
    })
}

let contentSave = function (obj, callback) {
    let content = new Contents(obj)
    content.save(function (err) {
        callback(err)
    })
}

const info = module.exports = { 
    User,
    Contents,
    userSave,
    contentSave
}