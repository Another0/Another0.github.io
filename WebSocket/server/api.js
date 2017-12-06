const express = require('express')
const info = require('./model')
// var multiparty = require('multiparty')
const router = express.Router()

router.post('/login', (req, res) => {
    if (req) {
        info.User.find({account: req.body.account}, function (err, result) {
            if (err) return console.log(err)

            res.send(result[0])
        })
    }
})

module.exports = router