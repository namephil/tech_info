const mongooes = require('mongoose')
const Joi = require('joi')

//定义category的结构
const categorySchema = new mongooes.Schema({
    name:{
        type: String,
        require: true,
        maxlength: 50,
        minlength: 2
    }
})


// 创建Model
const Category = mongooes.model('Category', categorySchema)

//定义校验规则
function categoryValidator(data){
    const Schema = Joi.object({
        name: Joi.string().max(50).min(2).required().messages({
            'string.base': "name必须是字符串",
            'string.min': "name最少2个字符",
            'string.max': "name最多50个字符"
        })
    })
    return Schema.validate(data)
}

module.exports = {
    Category,
    categoryValidator
}