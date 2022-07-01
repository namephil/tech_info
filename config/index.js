module.exports = {
    // 项目配置
    app: {
        port: process.env.PORT || 3000
    },
    // 数据库配置
    db: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017/techinfo'
  },
  // jwt 使用的密钥
  jwtPrivateKey: '374b3d5e-6505-4f9c-a305-a6dbc1eb1689'
}