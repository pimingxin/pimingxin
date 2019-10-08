class EventEmmiter {
  constructor() {
    this.EventList = {}
  }

  on(eventname,cb) {
    this.EventList[eventname] = cb
  }

  off(eventname) {
    delete this.EventList[eventname]
  }

  emit(eventname,...args) {
    if (this.EventList[eventname]){
      this.EventList[eventname](...args)
      return true
    }else{
      return false
    }
  }
}


var emmiter = new EventEmmiter()
emmiter.on('foo', () => {console.log(1)})

emmiter.emit('foo')//will log 1


class EventEmmiter{
  constructor(){
    this.EventList = {}
  }
  on(type,handler){
    if (tpye in this.EventList){
      this.EventList[type].push(handler)
    }else{
      this.EventList[type] = [handler]
    }
    return this
  }
  off(type,handler){
    var lists = this.EventList[type]

    this.EventList[type] = lists.filter(it => it != handler)
    
    return this
  }
  emit(type,...args){
    var lists = this.EventList[type]
    if (lists){
      for (let i = 0 ; i < lists.length ; i++){
        var handler = lists[i]
        handler.call(this,...args)
      }
    }
  }
}