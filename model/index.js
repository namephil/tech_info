const mongooes = require('mongoose')
const config = require('../config')
//连接mongoDB
mongooes.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongooes.connection

db.on('error', err => {
    console.log('连接失败', err)
})

db.on('open', () => {
    console.log('连接成功')
})