const router = require('express').Router()

const { articleValidator } = require('../model/articles')
const validator = require('../middleware/validate')
const auth = require('../middleware/auth')
const article = require('../controller/articles')

//获取全部
router.get('/',auth, article.getall)

// 获取某个
router.get('/:aid', auth, article.getone)

// 添加
router.post('/', [auth, validator(articleValidator)],article.create )

// 编辑
router.put('/:aid', [auth, validator(articleValidator)], article.update)

// 删除
router.delete('/:aid', auth, article.delete)

module.exports = router