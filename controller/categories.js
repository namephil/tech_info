const {Category} = require('../model/categories')
// 获取全部分类
exports.getAll = async (req, res, next) => {
    try{
        //查询所有分类信息
        const data = await Category.find()
        res.status(200).json({
            code: 200,
            msg:'获取全部分类成功'
        })
    } catch(err) {
        next(err)
    }
}

//获取某个分类
exports.getone = async (req, res, next) => {
    try{
        //检测是否存在_id参数
        //const id = req.params._id   //url传参
        const cid = req.params.cid   //动态路由传参
        if(!cid){
          return res.status(400).json({
            code:400,
            msg:'请传入分类id'
          })
        }
        //id存在,通过动态路由参数获取分类
        const data = await Category.findById(cid)
        if(!data){
            return res.status(400).json({
                code:400,
                msg:'获取信息失败'
              })
        }
        res.status(200).json({
            code: 200,
            msg:'获取分类成功'
        })
    } catch(err) {
        next(err)
    }
}

//添加分类
exports.add = async (req, res, next) => {
    try{
        //检测是否已存在要添加的
        const data = req.body
        const cate = await Category.findOne(data)
        //分类存在
        if(cate){
            return res.status(400).json({
                code: 400,
                msg:'分类已经存在'
            })
        }
        //分类不存在，创建
        cate = new Category(data)
        await cate.save()

        res.status(200).json({
            code:200,
            msg:'添加成功'
        })
    } catch(err) {
        next(err)
    }
}

// 编辑分类功能
exports.edit = async (req, res, next) => {
    try{
        //检测是否存在_id参数
        //const id = req.params._id   //url传参
        const cid = req.params.cid   //动态路由传参
        if(!cid){
          return res.status(400).json({
            code:400,
            msg:'请传入分类id'
          })
        }
        // 根据动态路由参数更新数据
        const data = await Category.findByIdAndUpdate(cid)
        if(!data){
            return res.status(400).json({
                code:400,
                msg:'更新信息失败'
              })
        }
        res.status(200).json({
            code: 200,
            msg:'更新分类成功'
        })
    } catch(err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try{
         //检测是否存在_id参数
         const id = req.params.cid
         if(!id){
           return res.status(400).json({
             code:400,
             msg:'请传入_id'
           })
         }
         // 查找并删除用户
         const data = await Category.findByIdAndDelete(id)
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