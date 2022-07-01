module.exports = (validator) => {
    return (req, res, next) => {
      const { error, value } = validator(req.body)
      console.log(error)
      if (error) {
        // 说明数据不满足规则，无需向后执行
        return res.status(400).json({
          code: 400,
          value: error._original,
          msg: error.details[0].message
        })
      }
      // 数据校验通过，同时处理成功
      req.validValue = value
      next()
    }
  }