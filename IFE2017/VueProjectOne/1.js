function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype.walk = function(data) {
  let val;

  for(let key in data) {
    val = data[key];

    if(data.hasOwnProperty(val)) {
      new Observer(val);
    }

    this.convert(key, val);
  }
}

Observer.prototype.convert = function(key, val) {
   Object.defineProperty(this.data,key,{
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val
        },
        set: function (newVal) {
            console.log('你设置了' + key);
            console.log('新的' + key + ' = ' + newVal)
            if (newVal === val) return;
            val = newVal
        }
  });
}

let a = {
  name: "wo",
  age: "20"
};

new Observer(a);


