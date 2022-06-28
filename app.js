// 引入配置文件
const config = require('./config/index.js')

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(config.app.port, () => {
    console.log(`running at http://localhost: ${config.app.port}`)
})