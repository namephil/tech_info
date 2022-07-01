const mongooes = require('mongoose')
const Joi = require('joi')
//引入JOI-objectid并作为Joi的属性
Joi.ObjectId = require('joi-objectid')(Joi)


//定义articles结构
const articleSchema = new mongooes.Schema({
    title:{
        type: String,
        require: true,
        minlength:2,
        maxlength:50
    },
    content:{
        type: String,
        require: true,
        minlength:2,
        maxlength:200
    },
    status:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    // 需要和catrgory联动
    catrgory:{
        type: mongooes.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    author:{
        type: mongooes.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

// 创建modle
const Article = mongooes.model('atricle',articleSchema)

// 创建内容校验函数
function articleValidator(data){
    const schema = Joi.object({
        title: Joi.string().min(2).max(50).required().messages({
            'string.base': 'title必须为字符串',
            'any.required':'title必须设置',
            'string.min': "title最少2个字符",
            'string.max': "title最多50个字符"
        }),
        content: Joi.string().min(2).max(200).required().messages({
            'string.base': 'content必须为字符串',
            'any.required':'content必须设置',
            'string.min': "content最少2个字符",
            'string.max': "content最多200个字符"
        }),
        status: Joi.string().valid('published', 'drafted', 'trashed').required().messages({
            'string.base': 'status必须为字符串',
            'any.required':'status必须设置',
            'any.only':'valid取值错误,可选值为publish/draft/trashed'
        }),
        catrgory: Joi.ObjectId().required().messages({
            'string.pattern.name':'category格式有误,应为objectid类型',
            'any.required':'catrgory必须设置'
        }),
        author: Joi.ObjectId().required().messages({
            'string.pattern.name':'author格式有误,应为objectid类型',
            'any.required':'author必须设置'
        })

    })
    return schema.validate(data)
}


module.exports = {
    Article,
    articleValidator
}