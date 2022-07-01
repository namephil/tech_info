// 引入 User 模型
const { User } = require('../model/user')
// 引入 Arricle 模型
const { Article } = require('../model/articles')

// 引入 bcrypt
const bcrypt = require('bcrypt')

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

// 获取用户信息接口
exports.getInfo = async (req, res, next) => {
  try {
    // 1 查询用户信息
    const data = await User.findById(req.userData._id, { password: 0 })

    // 2 发送响应
    res.status(200).json({
      code: 200,
      msg: '获取用户信息成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 编辑用户
exports.updateInfo = async (req, res, next) => {
  try {
    // 1 检测是否存在 _id 参数
    const body = req.body
    if (!body._id) {
      return res.status(400).json({
        code: 400,
        msg: '缺少参数 _id'
      })
    }

    // 对编辑用户中的密码信息进行加密，同时也可对email进行查询，避免重复(略)
    const salt = await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(body.password, salt)

    // 2 查找并更新用户
    const data = await User.findByIdAndUpdate(body._id, body)
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '编辑用户信息失败'
      })
    }

    // 3 成功响应
    //   - 不响应密码信息
    delete body.password
    res.status(200).json({
      code: 200,
      msg: '编辑用户信息成功',
      data: body
    })
  } catch (err) {
    next(err)
  }
}

// 删除用户
exports.deleteUser = async (req, res, next) => {
  try {
    // 1 检测是否存在 id
    const id = req.body._id
    if (!id) {
      return res.status(400).json({
        code: 400,
        msg: '请传入id'
      })
    }

    // 2 查找用户数据并删除
    const data = await User.findByIdAndDelete(id)

    // 3 添加了新功能-删除用户发布过的文章信息
    await Article.remove({
      author: id
    })

    //  - data 为 null 说明没有删除成功
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '删除用户失败',
        value: {
          _id: id
        }
      })
    }
    // 3 删除成功，正常响应即可
    res.status(200).json({
      code: 200,
      msg: '删除用户成功',
      data
    })
  } catch (err) {
    next(err)
  }
}