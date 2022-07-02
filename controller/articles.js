const {Article} = require('../model/articles')

//获取全部
exports.getall = async (req, res, next) => {
    try{
        //检测是否存在分类参数
        const { status, category } = req.query
        let data
        if(status || category){
            data = await Article.find(req.query)
        }else{
            data = await Article.find()
        }
        res.status(200).json({
            code:200,
            msg:'获取所有文章成功',
            data
        })
    } catch(err) {
        next(err)
    }
}

//获取某个
exports.getone = async (req, res, next) => {
    try{
        //根据id获取数据
        const id = req.params.aid
        //populate关联信息
        // const data = await Article.findById(aid).populate([{
        //     path: 'category',
        //     select: 'name'
        // },{
        //     path:'author',
        //     select: 'email'
        // }])
        const data = await Article.findById(aid).populate('category author', 'name')
        //检测是否存在数据
        if(!data){
            return res.status(400).json({
                code: 400,
                msg:'获取文章失败',
                value:{
                    id
                }
            })
        }
        res.status(200).json({
            code:200,
            msg:'获取文章成功',
            data
        })
    } catch(err) {
        next(err)
    }
}

//添加文章
exports.create = async (req, res, next) => {
    try{
        //创建并存储数据,object.assign合并对象
        const data = Object.assign(req.body, { author: req.userData._id })
        await data.save()

        res.status(200).json({
            code:200,
            msg:'添加文章成功',
            data
        })
    } catch(err) {
        next(err)
    }
}

//编辑文章
exports.update = async (req, res, next) => {
    try{
        // 1 修改数据
    const data = await Article.findByIdAndUpdate(req.params.aid, req.body, { new: true })
    
    // 2 检测并响应
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '文章修改失败',
        value: Object.assign(req.body, {
          _id: req.params.aid
        })
      })
    }

    res.status(200).json({
      code: 200,
      msg: '文章修改成功',
      data
    })
    } catch(err) {
        next(err)
    }
}

//删除文章
exports.delete = async (req, res, next) => {
    try{
        // 1 删除数据
        const data = await Article.findByIdAndDelete(req.params.articleId)
        // 2 检测并响应
        if (!data) {
            return res.status(400).json({
                code: 400,
                msg: '删除文章失败',
                value: {
                id: req.params.aid
                }
            })
        }

        res.status(200).json({
            code: 200,
            msg: '删除文章成功',
            data
        })
    } catch(err) {
        next(err)
    }
}