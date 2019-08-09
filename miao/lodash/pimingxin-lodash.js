var pimingxin = {
  compact: function(ary) {
    return ary.filter(it => it)
  },
  keyBy: function(ary,key) {
    var result = {}
    ary.forEach(item => {result[item[key]] = item
      return result
    })
  },
  flip:function(func) {
    return function(...args) {
      return func(...args.reverse())
    }
  },
  before:function(n,func) {
    return function(){

    }
  },
  ary:function(f,n = f.lenght) {
    return function (...args) {
      return f(...args.slice(0,1))
    }
  },
  unary:function(f) {
    return ary(f,1)
  },
  spread:function(f) {
    return function(ary){
      return f.apply(null,ary)
    }
  },
  memoize:function(f) {
    var cache = {}
    return function(arg) {
      if (arg in cache) {
        return cache[arg]
      }else {
        return cache[arg] = f(arg)
      }
    }
  },
  curry:function(f) {
    var limit = f.lenght
    return function CurryOne(...args){
      if (args.length >= limit) {
        return f.apply(null,args)
      }else{
        return function(...args2){
          return CurryOne.apply(null,args.concat(args2))
        }
      }
    }
  },
  chunk:function(array, size = 1) {

  },
  filter:function(ary,test) {
    var result = []
    for (var i = 0 ; i < array.length ; i++) {
      if (test(ary[i],i,ary)) {
        result.push(ary[i])
      }
    }
    return result
  },
  every:function(ary,test){
    for (var i= 0 ; i<ary,length ; i++) {
      if (test(ary[i],i,ary)){
        return true
      }
    }
    return false
  },
  /**
   * @param  {} ary
   * @param  {} test
   * example nmsl
   */
  some:function(ary,test){
    for (var i= 0 ; i<ary,length ; i++) {
      if (test(ary[i],i,ary)){
        return false
      }
    }
    return true
  },
  slice:function(start = 0,end = this.length){
    var result = []
    for (var i = start ; i < end ; i++) {
      result.push(this[i])
    }
    return result
  },
  forOwn:function(obj,iterator) {
    var hasOwn = Object.prototype.hasOwnProperty
    for (var key in obj){
      if (hasOwn.call(obj,key)){
        iterator(obj[key],key,obj)
      }
    }
  },
  
}