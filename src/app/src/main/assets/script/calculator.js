var sum = 0;
var ret = "";
var keypadValue = [ "AC", "<-", "(", ")", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+" ];

function init() {
    var table = document.getElementById("keypad");

    
    window.onkeydown = onKeyDown;
    window.onkeyup   = onKeyUp;
    
    for (var i = 0; i < 5; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var td = document.createElement("td");
            td.className="tile";
            var idx = i*4 + j;
         
            td.value = idx;
            td.index = idx;
            td.textContent = keypadValue[idx];
            td.onclick = onClick;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    var MmkeypadId = [ "btnSA", "btnSB", "btnSC", "btnSD", "btnA", "btnB", "btnC", "btnD" ];
    
    for (var i = 0; i < MmkeypadId.length; i++) {
        var btn = document.getElementById(MmkeypadId[i]);
        btn.onclick = onClick;
        btn.index = i + 21;
    }

}  

function onKeyUp(e) {
}
function onKeyDown(e) {
}
function onClick(e) {
   var clkTile = e.srcElement.index;
   var isClickEqual = false;
   var tsum = ""
   var sa = "", sb = "", sc = "", sd = ""
   var mmID = [ "sa", "sb", "sc", "sd" ];

   switch(clkTile) {
   case 0 : // AC
        sum = 0;
        ret = "";
        break;
   case 1 : // <-
        ret = ret.slice(0,-1);
        break;
   case 2 : // (
   case 3 : // )
   case 4 : // 7
   case 5 : // 8
   case 6 : // 9
   case 7 : // ÷
   case 8 : // 4
   case 9 :
   case 10 :
   case 11 : // x
   case 12 : 
   case 13 :
   case 14 :
   case 16 : // 0
   case 19 : // +
        ret = ret + keypadValue[clkTile];
        break;
   case 15 : // -
        if (ret == "") {
            ret = "-";
        } else {
            ret = ret + "-";
        }
        break;
   case 17 : // .
        if (ret == "") {
            ret = "0.";
        } else {
            ret = ret + ".";
        }                    
        break;
   case 18 : // =
        if (ret == "" && sum != 0) {
            ret = sum;
        } else {
            tsum = ret;
            try {
                console.log(ret);
                sum = eval(ret);
            } catch(e) {
                sum = "Error";
            }
            ret = "";
        }
        isClickEqual = true;
        break;        
   case 21 :
   case 22 :
   case 23 :
   case 24 :
       if (ret == "" && sum != 0) {
          tsum = sum;
       } else {
          tsum = ret;
          try {
              console.log(ret);
              tsum = eval(tsum);
          } catch(e) {
              tsum = "0";
          }
       }
       
       if (typeof tsum !== 'undefined') {
         document.getElementById(mmID[clkTile-21]).value = tsum;
       } else {
         document.getElementById(mmID[clkTile-21]).value = 0;
       }
       ret = 0;
       break;
   case 25 : // A
        ret = ret + document.getElementById("sa").value; 
        break;
   case 26 :
       ret = ret + document.getElementById("sb").value;
       break;
   case 27 :
       ret = ret + document.getElementById("sc").value; 
       break;
   case 28 :
       ret = ret + document.getElementById("sd").value; 
       break;
   default:
       break;
   }
   console.log("Exp : " + ret + " Sum : " + sum);
   
   document.getElementById("result").value = isClickEqual ? sum : ret;
}         
