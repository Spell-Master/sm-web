/* 
 * Calculadora de medidas REM ou EM
 * @author Spell Master
 */

/*
 * Converte pixel para rem ou em
 */

function toRem() {
    var remValue = document.getElementById("calc").value;
    var result = document.getElementById("result");
    result.innerHTML = null;
    if (!remValue) {
        result.innerText = "Digite um valor numérico para calcular";
    } else if (isNaN(remValue) == true) {
        result.innerText = "Só é possível calcular números inteiros";
    } else {
        calc = remValue / 16;
        result.innerHTML = remValue + "PX equivale a <span class=\"text-blue bold\">" + calc + "</span>rem";
    }
}

/*
 * Converte rem ou em para pixel
 */

function toPx() {
    var remValue = document.getElementById("calc").value;
    var result = document.getElementById("result");
    result.innerHTML = "";
    if (!remValue) {
        result.innerText = "Digite um valor numérico para calcular";
    } else if (isNaN(remValue) == true) {
        result.innerText = "Só é possível calcular números inteiros";
    } else {
        calc = remValue * 16;
        result.innerHTML = remValue + "REM equivale a <span class=\"text-blue bold\">" + calc + "</span>px";
    }
}

/*
 * Calcula percentual
 */
function toPec() {
    var calcont = document.getElementById("cal-container").value;
    var calchild = document.getElementById("cal-child").value;
    var resultp = document.getElementById("result-prc");
    resultp.innerHTML = "";
    if (!calcont || !calchild) {
        resultp.innerText = "Digite um valor numérico para calcular";
    } else if (isNaN(calcont) == true || isNaN(calchild) == true) {
        resultp.innerText = "Só é possível calcular números inteiros";
    } else {
        calc = calchild / calcont;
        resultp.innerHTML = calchild + " de " + calcont + " equivale a <span class=\"text-blue bold\">" + calc + "</span>%";
    }
}
