function myPrimeraFuncion() {
    let numeroUno = parseInt(prompt("Ingrese el primer numero"));
    let SALUDO = prompt("Ingrese un saludo");
    let numeroAleatorio = parseInt(prompt("Ingrese un numero aleatorio"));;
    if (numeroUno > 1000 || SALUDO === "Hola" || (numeroAleatorio >= 10 && numeroAleatorio <= 50)) {
        if (numeroUno > 1000) {
            swal('Este numero es mayor a 1000', 'success');
        }
        if (SALUDO === "Hola") {
            console.log('si es un Hola')
        } else {
            console.log('No es un Hola')
        }
        if (numeroAleatorio >= 10 && numeroAleatorio <= 50) {
            swal('Numero aleatorio esta entre 10 y 50', 'success');
        } else {

        }
    } else {
        swal('No entro a Ninguno', 'error');

    }

}