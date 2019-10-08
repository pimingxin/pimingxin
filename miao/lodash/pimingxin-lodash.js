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
  difference(array,...values){
    var res = []
    for (value of values){
      res.push(...value)
    }
    return array.filter(it => res.indexOf(it) == -1)
  },
  differenceBy(array,...values){

  },
  drop(array,n = 1){
    return array.slice(n)
  },
  dropRight(array,n=1){
    if (n > array.length){
      return []
    }
    return array.slice(0,array.length - n)
  },
  fill(array, value, start = 0, end = array.length){
    for (let i = start ; i < end ; i++){
      array[i] = value
    }
    return array
  },
  indexOf(array, value,fromIndex=0){
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
  head(array){
    return array[0]
  },
  initial(array){
    return array.slice(0,array.length-1)
  },
  intersection(array,...arrs){
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
  join(array, separator=','){
    var res = ""
    for (var i = 0 ; i < array.length - 1 ; i++){
      res += array[i] + "" + separator
    }
    res += array[array.length - 1]
    return res
  },
  last(array){
    return array[array.length-1]
  },
  lastIndexOf(array, value,fromIndex=array.length -1){
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
  nth(array, n=0){
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
  pull(array,...values){
    return array.filter(it => !values.includes(it))
  },
  reverse(array){
    var res = []
    for (var a = array.length - 1 ; a >= 0 ; a--){
      res.push(array[a])
    }

    for (var i = 0 ; i < array.length ; i++){
      array[i] = res[i]
    }
    return array
  },
  isNaN(value){
    if (value.toString() == 'NaN'){
      return true
    }
    return false
  },
  range(number,end,pive){//load
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
  clamp(number, lower = upper, upper){
    if (number >= upper){
      return upper
    }else if (number < lower){
      return lower
    }else if (number > lower){
      return number
    }
  },
  inRange(number, start=0, end){
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
  map(){
    
  },
  capitalize(str){
    var [first,...rest] = str

  }
}