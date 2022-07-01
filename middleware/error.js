// http://expressjs.com/zh-cn/guide/error-handling.html
module.exports = (err, req, res, next) => {
    res.status(500).json({
      code: 500,
      msg: '服务端错误'
    })
  
    // 在服务端输出错误信息
    console.log(err)
  }