function Event(){
  this.events = {};
}

Event.prototype.on = function(attr, callback){
  if(this.events[attr]){
    this.events[attr].push(callback);
  }else{
    this.events[attr] = [callback];
  }
}

// Event.prototype.off = function(attr){
//   for(let key in this.events){
//     if(this.events.hasOwnProperty(key) && key === attr){
//       delete this.events[key];
//     }
//   }
// }

Event.prototype.emit = function(attr, oldVal,newVal){
  if(this.events[attr]) {
    for(let i = 0; i < this.events[attr].length; i++) {
      this.events[attr][i](oldVal,newVal);
    }
  }
}

function Observer (data) {
  //暂不考虑数组
  this.data = data;
  this.makeObserver(data);
  this.eventsBus = new Event();
}

Observer.prototype.setterAndGetter = function (key, val) {
  let _this = this;
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      console.log('你访问了' + key);
      return val;
    },
    set: function(newVal){
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal);
      //触发$watch函数
      _this.eventsBus.emit(key, val, newVal);
      val = newVal;
      //如果newval是对象的话
      if(typeof newVal === 'object'){
        new Observer(val);
      }
    }
  })
}

Observer.prototype.makeObserver = function (obj) {
  let val;
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      val = obj[key];
      //深度遍历
      if(typeof val === 'object'){
        new Observer(val);
      }
    }
    this.setterAndGetter(key, val);
  }
}

Observer.prototype.$watch = function(attr, callback){
  this.eventsBus.on(attr, callback);
}

let app = new Observer({
    name: 'liujianhuan',
    age: 25,
    company: 'Qihoo 360',
    address: 'Chaoyang, Beijing'
})

app.$watch('age', function(oldVal, newVal){
    console.log("我的年龄变了，原来是: "+oldVal+"岁，现在是："+newVal+"岁了")
})

app.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
})

app.$watch('address', function(oldVal, newVal){
    console.log("我的地址也变了，原来是"+oldVal+"变成了"+newVal)
})
