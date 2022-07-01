exports.getAll = (req, res, next) => {
    try{
        res.send('获取全部用户')
    } catch(err) {
        next(err)
    }
}

exports.getone = (req, res, next) => {
    try{
        res.send('获取某个')
    } catch(err) {
        next(err)
    }
}

exports.add = (req, res, next) => {
    try{
        res.send('添加分类')
    } catch(err) {
        next(err)
    }
}

exports.edit = (req, res, next) => {
    try{
        res.send('编辑分类')
    } catch(err) {
        next(err)
    }
}

exports.delete = (req, res, next) => {
    try{
        res.send('删除分类')
    } catch(err) {
        next(err)
    }
}