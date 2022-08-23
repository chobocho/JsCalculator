var sum = 0;
var ret = "";
let prev_ret1 = "";
let prev_ret2 = "";
var keypadValue = ["AC", "Sqrt", "Pi", "Undo", "CE", "<-", "(", ")", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
var functionEvent = {};
var result_view = "result1";

function init() {
    var table = document.getElementById("keypad");

    window.onkeydown = onKeyDown;
    window.onkeyup = onKeyUp;

    for (var i = 0; i < 6; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var td = document.createElement("td");
            td.className = "tile";
            var idx = i * 4 + j;

            td.value = idx;
            td.index = idx;
            td.textContent = keypadValue[idx];
            if (td.textContent == "CE") {
                td.className = "tileRed";
            }
            td.onclick = onClick;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    var MmkeypadId = ["btnMR", "btnMP", "btnMM", "btnMC", "btnChangeView"];

    for (var i = 0; i < MmkeypadId.length; i++) {
        var btn = document.getElementById(MmkeypadId[i]);
        //console.log(MmkeypadId[i]);
        btn.onclick = onClick;
        btn.index = i + 25;
    }

    functionEvent['AC'] = { 'func': clearAll, 'param': [] };
    functionEvent['Sqrt'] = { 'func': sqrt, 'param':[]};
    functionEvent['Pi'] = { 'func': add_text, 'param':['3.14159265']};
    functionEvent['Undo'] = { 'func': undo, 'param':[]};
    functionEvent['CE'] = { 'func': clearResult, 'param':[]};
    functionEvent['<-'] = { 'func': del, 'param':[]};
    functionEvent['('] = { 'func': add_text, 'param':['(']};
    functionEvent[')'] = { 'func': add_text, 'param':[')']};
    functionEvent['-'] = { 'func': add_operator, 'param':['-']};
    functionEvent['/'] = { 'func': add_operator, 'param':['/']};
    functionEvent['*'] = { 'func': add_operator, 'param':['*']};
    functionEvent['.'] = { 'func': add_operator, 'param':['.']};
    functionEvent['+'] = { 'func': add_operator, 'param':['+']};
    functionEvent['='] = { 'func': calculator, 'param':[]};

    functionEvent['0'] = { 'func': add_text, 'param':['0']};
    functionEvent['1'] = { 'func': add_text, 'param':['1']};
    functionEvent['2'] = { 'func': add_text, 'param':['2']};
    functionEvent['3'] = { 'func': add_text, 'param':['3']};
    functionEvent['4'] = { 'func': add_text, 'param':['4']};
    functionEvent['5'] = { 'func': add_text, 'param':['5']};
    functionEvent['6'] = { 'func': add_text, 'param':['6']};
    functionEvent['7'] = { 'func': add_text, 'param':['7']};
    functionEvent['8'] = { 'func': add_text, 'param':['8']};
    functionEvent['9'] = { 'func': add_text, 'param':['9']};

    functionEvent['MR'] = { 'func': recall_memory, 'param':['memory']};
    functionEvent['M+'] = { 'func': memory_add_ret, 'param':['memory']};
    functionEvent['M-'] = { 'func': memory_minus_ret, 'param':['memory']};
    functionEvent['MC'] = { 'func': clear_memory, 'param':['memory']};

    functionEvent['View'] = { 'func': chooseResultView, 'param':[]};
    //test_calculator();
}

function chooseResultView() {
    document.getElementById(result_view).style.backgroundColor = "white";
    if (result_view == "result1") {
        result_view = "result2";
        document.getElementById(result_view).style.backgroundColor = "yellow";
    } else {
        result_view = "result1";
        document.getElementById(result_view).style.backgroundColor = "yellow";
    }
    ret = document.getElementById(result_view).value;
    console.log("ChooseResultView: " + result_view);
}

function clearAll() {
    ret = "0";
    document.getElementById("result1").value = ret;
    document.getElementById("result2").value = ret;
    document.getElementById("memory").value = "0";
}

function clearResult() {
    if (result_view == "result1") {
        prev_ret1 = ret;
    } else {
        prev_ret2 = ret;
    }

    ret = "0";
    document.getElementById(result_view).value = ret;
}

function sqrt() {
    calculator();
    if (typeof ret != "number") {
        return;
    }
    if (ret.length == 0) {
        return;
    }
    ret = Math.sqrt(ret);
    document.getElementById(result_view).value = ret;
 }

function undo() {
    if (result_view == "result1") {
        ret = prev_ret1;
    } else {
        ret = prev_ret2;
    }
}

function del() {
    ret = ret.slice(0,-1);
    if (ret.length == 0) {
        ret = "0";
    }
}

function calculator() {
    if (result_view == "result1") {
        prev_ret1 = ret;
    } else {
        prev_ret2 = ret;
    }
    tsum = ret;
    try {
        console.log(ret);
        sum = eval(ret);
    } catch (e) {
        sum = "Error";
    }
    ret = sum;
    console.log("Exp : " + tsum + " Sum : " + sum);
}

function add_operator(op) {
    if (ret.length == 0) {
        ret = '0';
    } 
    ret += op; 
}

function add_text(character) {
    if (ret == '0') {
        ret = '';
    } 
    ret += character;
}

function clear_memory(mm_id) {
    document.getElementById(mm_id).value = "0";
}

function recall_memory(mm_id) {
    if (ret == '0') {
       ret = "";
    } 
    let mm = document.getElementById(mm_id).value;
    if (mm == '0') {
        return;
    }
    ret += mm;
}

function memory_add_ret(btn_id) {
    calculator();
    if (ret.length == 0) {
        return;
    }

    let ma = document.getElementById(btn_id).value;
    let tmp = 0;
    try {
        let exp = ma + '+' + ret;
        tmp = eval(exp);
        console.log("Exp : " + exp + " Sum : " + tmp);
    } catch (e) {
        tmp = "0";
    }

    console.log(typeof tmp);
    if (typeof tmp == "number") {
        document.getElementById(btn_id).value = tmp;
    }
}

function memory_minus_ret(btn_id) {
    calculator();
    if (ret.length == 0) {
        return;
    }
    
    let ma = document.getElementById(btn_id).value;
    let tmp = 0;
    try {
        let exp = ma + '-' + ret;
        tmp = eval(exp);
        console.log("Exp : " + exp + " Sum : " + tmp);
    } catch (e) {
        tmp = "0";
    }

    console.log(typeof tmp);
    if (typeof tmp == "number") {
        document.getElementById(btn_id).value = tmp;
    }
}

function onKeyUp(e) {
}
function onKeyDown(e) {
}
function onClick(e) {
    let id = e.srcElement.textContent;
    console.log("Click: ",id);

    if (ret == 'Error') {
        ret = "0";
    }

    if (ret == 'Infinity') {
        ret = "0";
    }
    
    console.log(typeof ret);

    if (typeof ret == "undefined") {
        ret = "0";
    }
    document.getElementById(result_view).value = ret;
    _OnClick(id);
}


function _OnClick(id) {
    if (functionEvent[id]['param'].length == 0) {
        functionEvent[id]['func']();
    } else {
        functionEvent[id]['func'](functionEvent[id]['param']);
    }
    document.getElementById(result_view).value = ret;
}

function test_calculator() {
    _OnClick('/');
    _OnClick('=');
}
