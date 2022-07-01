const { isObjectIdOrHexString } = require("mongoose")

// 数组旋转k步
function rotate(arr, k){
    const length = arr.length
    if(!k || length === 0) return arr
    const step = Math.abs(k % length)

    const part1 = arr.slice(-step)
    const part2 = arr.slice(0, length - step)
    const part3 = part1.concat(part2)

    return part3
}

function Instanceof(L, R){
    let LP = L.__proto__
    let RP = R.prototype
    while(true){
        if(L == null) return false
        if(LP === RP) return true
        Lp = LP.__proto__
    }
}

Function.prototype.myCall = function(context){
    if( typeof this !== 'function'){
        throw new TypeError('not a function')
    }

    context = context || window
    context.fn = this
    let args = Array.from(arguments).slice(1)

    let result = context.fn(args)

    delete context.fn
    return result
}

Function.prototype.myApply = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('not a function')
    }

    context = context || window
    context.fn = this
    let result
    if(arguments[1]){
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }

    delete context.fn

    return result
}

Function.prototype.myBind = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('not a function')
    }
    context = context || window
    const _this = this
    let args = Array.prototype.slice.call(arguments, 1)

    return function F(){
        if(this instanceof F){
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context, args.concat(...arguments))
        }
    }

}

function myNew(fn,...args){
    let obj = {}
    obj.__proto__ = fn.prototype
    let result = fn.apply(obj, args)

    return result instanceof Object ? result: obj
}

function shallow(o){
    let obj = {}
    for (i in o){
        obj[i] = o[i]
    }
    return obj
}

function deepClone1(o) {
    return JSON.parse(JSON.stringify(O))
}

function deepclon(o, hash = new Map()){
    if(!isObject(o)) return o
    if(hash.has(o)) return hash.get(o)
    const obj = Array.isArray(o) ? [] : {}
    
    hash.set(o, obj)
    for(let i in o){
        if(isObject(o[i])){
            obj[i] = deepclon(o[i])
        } else{
            obj[i] = o[i]
        }
    }
    return obj
}

var ajax = {
    get: function(url, callback){
        let xhr = XMLHttpRequest()
        xhr.open('get', url, false)
        xhr.onreadystatechange = function(){
            if(xhrreadyState === 4){
                if(xhr.status === 200){
                    callback(xhr.responseText)
                }
            }
        }
        xhr.send()
    },
    post: function (url, callback){
        let xhr = XMLHttpRequest()
        xhr.open('post', url, true)
        xhr.setRequestHeader("Content-type", 'x-www-form-urlencoded')
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    callback(xhr.responseText)
                }
            }
        }
        xhr.setRequestHeader('content-type', 'application/x-form-urlencoded')
        xhr.send()
    }
}

function throttle(fn, delay){
    let pre = 0
    return function(){
        let now = Date.now()
        const _this = this
        if( now - pre > delay){
            fn.apply(_this, arguments)
            pre = now
        }
    }
}

function debounce(fn, time){
    let timeout
    return function() {
        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn(arguments)
        },time)
    }
}