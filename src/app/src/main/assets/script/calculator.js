var sum = 0;
var ret = "";
let prev_ret = "";
var keypadValue = ["AC", "Sqrt", "Pi", "Undo", "CE", "<-", "(", ")", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
var functionEvent = {};
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
            td.onclick = onClick;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    var MmkeypadId = ["btnAP", "btnBP", "btnCP", "btnDP", "btnAM", "btnBM", "btnCM", "btnDM", "btnA", "btnB", "btnC", "btnD", "btnCA", "btnCB", "btnCC", "btnCD"];

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

    functionEvent['A+'] = { 'func': memory_add_ret, 'param':['sa']};
    functionEvent['B+'] = { 'func': memory_add_ret, 'param':['sb']};
    functionEvent['C+'] = { 'func': memory_add_ret, 'param':['sc']};
    functionEvent['D+'] = { 'func': memory_add_ret, 'param':['sd']};
    functionEvent['A-'] = { 'func': memory_minus_ret, 'param':['sa']};
    functionEvent['B-'] = { 'func': memory_minus_ret, 'param':['sb']};
    functionEvent['C-'] = { 'func': memory_minus_ret, 'param':['sc']};
    functionEvent['D-'] = { 'func': memory_minus_ret, 'param':['sd']};
    functionEvent['A'] = { 'func': recall_memory, 'param':['sa']};
    functionEvent['B'] = { 'func': recall_memory, 'param':['sb']};
    functionEvent['C'] = { 'func': recall_memory, 'param':['sc']};
    functionEvent['D'] = { 'func': recall_memory, 'param':['sd']};
    functionEvent['CA'] = { 'func': clear_memory, 'param':['sa']};
    functionEvent['CB'] = { 'func': clear_memory, 'param':['sb']};
    functionEvent['CC'] = { 'func': clear_memory, 'param':['sc']};
    functionEvent['CD'] = { 'func': clear_memory, 'param':['sd']};

    //test_calculator();
}

function clearAll() {
    ret = "0";
    document.getElementById("result").value = ret;
    document.getElementById("sa").value = "0";
    document.getElementById("sb").value = "0";
    document.getElementById("sc").value = "0";
    document.getElementById("sd").value = "0";
}

function clearResult() {
    ret = "0";
    document.getElementById("result").value = ret;
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
    document.getElementById("result").value = ret;
 }

function undo() {
    ret = prev_ret;
}

function del() {
    ret = ret.slice(0,-1);
    if (ret.length == 0) {
        ret = "0";
    }
}

function calculator() {
    prev_ret = ret;
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
    ret += document.getElementById(mm_id).value; 
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
    document.getElementById("result").value = ret;
    _OnClick(id);
}


function _OnClick(id) {
    if (functionEvent[id]['param'].length == 0) {
        functionEvent[id]['func']();
    } else {
        functionEvent[id]['func'](functionEvent[id]['param']);
    }
    document.getElementById("result").value = ret;     
}

function test_calculator() {
    _OnClick('/');
    _OnClick('=');
}
