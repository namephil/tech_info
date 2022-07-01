const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function(req, res, next) {
    //接口鉴权（约定，前端请求头中包含有效的authorization字段，值为access token）
    const access_token = req.header('Authorization')
    //是否存在access_token
    if(!access_token){
      return res.status(401).json({
        code:401,
        msg:"无token"
      })
    }
    try{
      //存在token时验证是否有效
      const userData = jwt.verify(access_token, config.jwtPrivateKey)    //解密
      // console.log(userData)   输出{ _id: '62be4690071666905cb3bb5d', iat（token创建时间）: 1656664730 }
      // 得到了token中存储的的数据（用户信息），保存供后续使用
    }catch(err){
      res.status(401).json({
        code:401,
        msg:'token无效'
      })
    }
}