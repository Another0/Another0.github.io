window.onload = function() {
  let arr = [
    ["姓名","语文","数学","英语","总分"],
    ["小明",80,60,90,230],
    ["小红",20,90,70,190],
    ["小亮",90,50,100,240]
  ];

  let method = {
    create: function(x,y,arr3){
      let tab = document.querySelector("table");
      let st = "";
        for(let i = 0; i < x; i++) {
          let str="";
          for(let j = 0; j < y; j++) {
            if(i == 0) {
              if(j == 0){
                str+= "<th>"+arr3[i][j]+"</th>";
              }else{
                str+= "<th class='cla'>"+arr3[i][j]+"<span class='a'></span><span class='b'></span></th>";
              }
            }else{
              str+= "<td>"+arr3[i][j]+"</td>";
            }
            if(j == y-1){
              st+="<tr>"+str+"</tr>";
            }
          }
        tab.innerHTML = st;

        let  a = document.querySelectorAll(".a");
        let  b = document.querySelectorAll(".b");
        for(let i = 0; i < a.length; i++){
          
          a[i].index = i+1;
          b[i].index = i+1;
          a[i].onclick = function(){
            return method.sor(this.index,arr3,true);
          };
          b[i].onclick = function(){
            return method.sor(this.index,arr3,false);
          };
        }
      }      
    },
    sor: function(index,arr,s){

        let arr1 = [],arr2 = [arr[0]];
        for(let j = 1; j < arr.length; j++){
          arr1.push(arr[j][index]);
        }
        if(s){
          arr1.sort(function(a,b){
            return b-a;
          });
        }else{
          arr1.sort(function(a,b){
            return a-b;
          });
        }

        for(let n = 1; n < arr1.length+1; n++){
          for(let m = 1; m < arr.length; m++){
                
              if(arr[m][index] == arr1[n-1]){
                 let a = arr[m].splice(0,arr[m].length);
                 arr2.push(a);
                break;
              }
          }
        }
        method.create(4,5,arr2);
    }
  }

  method.create(4,5,arr);

}