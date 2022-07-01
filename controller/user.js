//引入User模型
const { User } = require('../model/user')

//使用bcrypt进行密码加密
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const config = require('../config')

// 用户注册接口
exports.register = async (req, res, next) => {
    try {
      // 存储经过校验的数据
      let { email, password } = req.validValue
      // 1 查询邮箱是否已经被注册过
      let user = await User.findOne({ email })
  
      // 检测是否存在获取到的用户信息
      if (user) {
        // 无法再次注册，响应注册失败
        return res.status(400).json({
          code: 400,
          msg: '用户已注册',
          data: { email }
        })
      }
  
      // 2 说明是可注册的新用户
      const salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password, salt)
  
      // 3 创建 user 实例
      user = new User({
        email,
        password,
        name: '请添加用户名'
      })
  
      // 4 存储
      await user.save()
  
      // 5 响应
      res.status(200).json({
        code: 200,
        msg: '注册成功',
        data: { email }
      })
    } catch (err) {
      next(err)
    }
  }

//用户获取

exports.getInfo = async (req, res, next) => {
    try{
      // 查询用户信息
      const user = await User.findById(req.userData._id, {password : 0})
      // 发送响应
      res.status(200).json({
        code:200,
        msg:'获取用户信息成功',
        data
      })
    } catch(err) {
        next(err)
    }
}

//编辑用户
exports.updateInfo = async (req, res, next) => {
    try {
        //检测是否存在_id参数
        const body = req.body
        if(!body._id){
          return res.status(400).json({
            code:400,
            msg:'缺少参数_id'
          })
        }
        // 查找并更新用户
        const data = await User.findByIdAndUpdate(body._id, body)
        if(!data){
          return res.status(400).json({
            code:400,
            msg:'编辑用户信息失败'
          })
        }
        //成功响应
        delete body.password // 删除body的密码，防止后面打印时泄露
        res.status(200).json({
          code: 200,
          msg:'编辑用户信息成功',
          data: body
        })
        
    } catch(err) {
        next(err)
    }
}

//删除用户
exports.deleteUser = async (req, res, next) => {
    try {
        //检测是否存在_id参数
        const id = req.body._id
        if(!id){
          return res.status(400).json({
            code:400,
            msg:'请传入_id'
          })
        }
        // 查找并删除用户
        const data = await User.findById(id)
        if(!data){
          return res.status(400).json({
            code:400,
            msg:'删除失败',
            value:{
              _id: id
            }
          })
        }
        //删除成功
        res.status(200).json({
          code:200,
          msg:'删除成功'
        })
    } catch(err) {
        next(err)
    }
}