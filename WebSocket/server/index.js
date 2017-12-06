const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const info = require('./model')
const app = express()
const server = require("http").createServer(app),
      io = require('socket.io').listen(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', api)
server.listen(3000)
console.log('success listen at port:3000......')

io.on('connection', function (socket) {
    socket.on('inRoom', function (data) {
        socket.broadcast.emit('inRoom', data.name)
        setContents().then((arr) => {
            socket.emit('inRoom', arr)
        })
    })

    socket.on('speack', function (data) {
        setContents(data).then((arr) => {
            io.sockets.emit('speack', arr)
        })
    })

})

async function setContents(data) {
    if (data) {
        await info.contentSave(data, function (err) {
            if (err) return console.log(err)
        })
    }

    return info.Contents.find({}).then((result) => {
        return result
    })
}
