function ejemplo1() {
    document.getElementById("ejemplo1").value = "12,15,29,37,85";
}
var miri = [];

function ejemplo2() {
    //Insertaré el ejemplo de modo aleatorio
    for (i = 0; i < 5; i++) {
        miri.push(parseInt(Math.random() * 100));
    }
    document.getElementById("ejemplo2").value = miri;
}
var aux = [];

function concatenar() {
    var array1 = document.getElementById("ejemplo1").value.split(/,/);
    var array2 = document.getElementById("ejemplo2").value.split(/,/);
    for (i = 0; i < array1.length; i++) {
        aux.push(array1[i]);
        aux.push(array2[i]);
    }
    alert(aux);
}

function Reiniciar() {
    window.location.href = 'ejercicio2.html';
}