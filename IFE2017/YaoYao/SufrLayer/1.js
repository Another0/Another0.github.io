window.onload = function() {
  let method = {
    onmousedown: function() {
      let dom = document.getElementById("dom");
      dom.onmousedown = function(event) {
        let e = event || window.event;
        let X = e.clientX - dom.offsetLeft;
        let Y = e.clientY - dom.offsetTop;
        console.log(X,Y,dom.offsetLeft)
        document.onmousemove = function(event) {
          let e = event || window.event;
          let ox = e.clientX - X;
          let oy = e.clientY - Y;

          if(ox < 0){
            ox = 0;
          }else if(ox > window.innerWidth - dom.offsetWidth) {
            ox = window.innerWidth - dom.offsetWidth; 
          }
          if(oy < 0){
            oy = 0;
          }else if(oy > window.innerHeight - dom.offsetHeight) {
            oy = window.innerHeight - dom.offsetheight;
          }

          dom.style.left = ox+"px";
          dom.style.top = oy+"px";
        }
        document.onmouseup = function() {
          this.onmouseup = null;
          this.onmousemove = null;
        }
      }

    },
    onmouse: function(event) {
      dom.onmousemove = function() {
        let dom = document.getElementById("dom");
        let e = event || window.event;
        let X = e.clientX;
        let Y = e.clientY;
        let ox = dom.offsetLeft + dom.offsetWidth;
        let oy = dom.offsetTop + dom.offsetHeight;
        let str = '';

        if(Math.abs(X - ox)<=3 && Math.abs(Y - oy)<=3) {
          dom.style.cursor = "se-resize";
          str = "br";
        }else if(Math.abs(X - dom.offsetLeft)<=3 && Math.abs(Y - dom.offsetTop)<=3){
          dom.style.cursor = "se-resize";
          str = "lt";
        }else if(Math.abs(X - ox)<=3 && Math.abs(Y - dom.offsetTop)<=3){
          dom.style.cursor = "ne-resize";
          str = "tr";
        }else if(Math.abs(X - dom.offsetLeft)<=3 && Math.abs(Y - oy)<=3){
          dom.style.cursor = "ne-resize";
          str = "bl";
        }else{
          dom.style.cursor = "";
          str = '';
        }
        method.fn(str);
      }
    },
    fn: function(dir) {
      let dom = document.getElementById("dom");
      let t = dom.offsetTop;
      let l = dom.offsetLeft;
      let w = dom.offsetWidth;
      let h = dom.offsetHeight;
      document.onmousedown = function(event) {
        if(dir == '') return;
        let e = event || window.event;
        let x = e.clientX;
        let y = e.clientY;
        document.onmousemove = function(event) {
          let e = event || window.event;
          let ox = e.clientX;
          let oy = e.clientY;
          switch(dir){
            case "lt": (function(){
              if(oy >= t+h-50) {
                if(ox >= l+w-100){
                  dom.style.top = t+h-50+"px";
                  dom.style.left = l+w-100+"px";
                }else{
                  dom.style.top = t+h-50+"px";
                  dom.style.left = l - (x-ox)+"px";
                  dom.style.width = w + (x-ox)+"px";
                }
              }else if(ox >= l+w-100){
                if(oy >= t+h-50){
                  dom.style.top = t+h-50+"px";
                  dom.style.left = l+w-100+"px";
                }else{
                  dom.style.left = l+w-100+"px";
                  dom.style.top = t - (y-oy)+"px";
                  dom.style.height = h + (y-oy)+"px";
                }
              }else{
                dom.style.left = l - (x-ox)+"px";
                dom.style.top = t - (y-oy)+"px";
                dom.style.width = w + (x-ox)+"px";
                dom.style.height = h + (y-oy)+"px";
              }
            })();break;
            case "br": (function(){
                dom.style.width = w + (ox-x)+"px";
                dom.style.height = h + (oy-y)+"px";
            })();break;
            case "tr":(function(){
              if(oy >= t+h-50) {
                  dom.style.top = t+h-50+"px";
                  dom.style.width = w + (ox-x)+"px";
              }else{
                dom.style.top = t - (y-oy)+"px";
                dom.style.width = w + (ox-x)+"px";
                dom.style.height = h + (y-oy)+"px";
              }
            })();break;
            case "bl":(function(){
              if(ox >= l+w-100) {
                  dom.style.left = l+w-100+"px";
                  dom.style.height = h + (oy-y)+"px";
              }else{
                dom.style.left = l - (x-ox)+"px";
                dom.style.width = w + (x-ox)+"px";
                dom.style.height = h + (oy-y)+"px";
              }
            })();break;
          }
        }
        document.onmouseup = function() {
          this.onmouseup = null;
          this.onmousemove = null;
        }
      }
    }
  }
  // method.onmousedown();
  // method.onmouse();
  let btn = document.querySelector("button");
  let dom = document.querySelector("#dom");
  let lay = document.querySelector("#lay");
  btn.onclick = function(){
    dom.style.display = "block";
    lay.style.display = "block";
    method.onmousedown();
    method.onmouse();
    lay.onclick = function(){
      dom.style.display = "none";
      lay.style.display = "none";
    }
  }

}
