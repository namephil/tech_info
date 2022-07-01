exports.getall = (req, res, next) => {
    try{
        res.send('获取全部')
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

exports.create = (req, res, next) => {
    try{
        res.send('添加文章')
    } catch(err) {
        next(err)
    }
}

exports.update = (req, res, next) => {
    try{
        res.send('编辑文章')
    } catch(err) {
        next(err)
    }
}

exports.delete = (req, res, next) => {
    try{
        res.send('删除文章')
    } catch(err) {
        next(err)
    }
}