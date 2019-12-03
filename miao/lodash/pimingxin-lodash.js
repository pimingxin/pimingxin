//By With Right While 的identity
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
    return function(...arg){
      return f(...arg.slice(0,1))
    }
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
  chunk:function(array, size = 1 , result =[]) {
    for (let i = 0 ; i < array.length; i+= size){
      var item = array.slice(i,i+size)
      result.push(item)
    }
    return result
  },
  filter:function(ary,test) {
    var result = []
    for (var i = 0 ; i < ary.length ; i++) {
      if (test(ary[i])) {
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
  difference:function(array,...values){
    var res = []
    for (value of values){
      res.push(...value)
    }
    return array.filter(it => res.indexOf(it) == -1)
  },
  differenceBy:function(array,...values){
    var iteratee = values.pop()
    if (typeof iteratee == 'function'){
      array.map(it => {
        if (it == values){
          return 
        }
      })
    }
  },
  drop:function(array,n = 1){
    return array.slice(n)
  },
  dropRight:function(array,n=1){
    if (n > array.length){
      return []
    }
    return array.slice(0,array.length - n)
  },
  dropRightWhile:function(array,){

  },
  fill:function(array, value, start = 0, end = array.length){
    for (let i = start ; i < end ; i++){
      array[i] = value
    }
    return array
  },
  indexOf:function(array, value,fromIndex=0){
    if (isNaN(value)){
      for (let i = fromIndex ; i < array.length ; i++){
        if (isNaN(array[i])){
          return i
        }
      }
      return -1
    }
    for (let i = fromIndex ; i < array.length ; i++){
      if (array[i] == value){
        return i
      }
    }
    return -1
  },
  head:function(array){
    return array[0]
  },
  initial(array){
    return array.slice(0,array.length-1)
  },
  intersection:function(array,...arrs){
    var res = []
    for (var arr of arrs){
      res = res.concat(arr)
    }
    var result = []
    for (var value of array){
      if (res.includes(value)){
        result.push(value)
      }
    }
    return result
  },
  join:function(array, separator=','){
    var res = ""
    for (var i = 0 ; i < array.length - 1 ; i++){
      res += array[i] + "" + separator
    }
    res += array[array.length - 1]
    return res
  },
  last:function(array){
    return array[array.length-1]
  },
  lastIndexOf:function(array, value,fromIndex=array.length -1){
    if (isNaN(value)){
      for (let i = fromIndex ; i >= 0 ; i--){
        if (isNaN(array[i])){
          return i
        }
      }
      return -1
    }
    for (let i = fromIndex ; i >= 0 ; i--){
      if (array[i] == value){
        return i
      }
    }
    return -1
  },
  nth:function(array, n=0){
    if (n >= 0){
      for (let i = 0 ; i < array.length ; i++){
        return array[n]
      }
    }else{
      n = Math.abs(n)
      for (let i = array.length - 1; i >=  0 ; i--){
        return array[n]
      }
    }
    return undefined
  },
  pull:function(array,...values){
    return array.filter(it => !values.includes(it))
  },
  reverse:function(array){
    var res = []
    for (var a = array.length - 1 ; a >= 0 ; a--){
      res.push(array[a])
    }

    for (var i = 0 ; i < array.length ; i++){
      array[i] = res[i]
    }
    return array
  },
  isNaN:function(value){
    if (value.toString() == 'NaN'){
      return true
    }
    return false
  },
  range:function(number,end,pive){//load
    var res = []
    if (number >= 0){
      for (var i = 0 ; i < Number(number); i++){
        res.push(i)
      }
    }else{
      for (var j = 0 ; j > Number(number) ; j--){
        res.push(j)
      }
    }
    return res
  },
  clamp:function(number, lower = upper, upper){
    if (number >= upper){
      return upper
    }else if (number < lower){
      return lower
    }else if (number > lower){
      return number
    }
  },
  inRange:function(number, start=0, end){
    if (end == undefined){
      end = start
      start = 0
    }
    if (number >= 0){
      if (number >= start && number < end){
        return true
      }
    }else{
      if (number <= start && number > end){
        return true
      }
    }
    return false
  },
  map:function(c,f){
    var res = []
    if (typeof c === 'object'){
      for (let v of c){
        res.push(f(v))
      }
    }
    return res
  },
  capitalize:function(str){
    var [first,...rest] = str

  },
  isMatch:function(obj,src){
    if (obj === src){
      return true
    }
    for (key in obj){
      if (typeof obj[key] === 'object' && src[key] !== null){
        if (!isMatch(obj[key],src[key])){
          return false
        }
      }
      if (obj[key] !== src[key]){
        return false
      }
    }
    return true
  },
  isMatchWith:function(obj, src, cus){
    for (var key in obj){
      if (cus(obj[key]) !== cus(src[key])){
        return false
      }
    }
    return true
  },
  repeat:function(str,n=1){
    if (n === 0){
      return ''
    }
    var newStr = ''
    for (let i = 0 ; i < n ; i++){
      newStr += str
    }
    return newStr
  },
  debounce:function(){

  },
  throttle:function(){
    
  }
  
}