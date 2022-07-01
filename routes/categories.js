const { categoryValidator } = require('../model/categories')

const router = require('express').Router()
const validator = require('../middleware/validate')
const auth = require('../middleware/auth')
const category = require('../controller/categories')

//获取全部
router.get('/', auth, category.getAll)

// 获取某个
router.get('/:cid', auth, category.getone)

// 添加
router.post('/', [auth, validator(categoryValidator)], category.add)

// 编辑
router.put('/', [auth, validator(categoryValidator)],category.edit)

// 删除
router.delete('/', auth, category.delete)

module.exports = router