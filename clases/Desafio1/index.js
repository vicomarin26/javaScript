let dinero = 50,
    ganancias = 0,
    apuesta = 20,
    numero = 0;

while (dinero > 0 && apuesta > 0) {
    let dado = Math.floor(Math.random() * 6) + 1;
    let num = prompt("A que numero quiere apostar del 1 al 6", "1");
    numero = parseInt(5);
    let cantidad = prompt("Cantidad que quiere apostar", "20");
    apuesta = parseInt(cantidad);
    document.write(`A salido el numero:` + dado)

    if (numero == dado) {
        dinero = dinero + apuesta * 2;
        alert("Has ganando dinero" + dinero);
    } else {
        dinero = dinero - apuesta;
        alert("Has perdido apuesta" + apuesta + " ,ahora tienes" + dinero);
    }

    if (dinero == 0) {
        alert("game over")

    }
    if (dinero > 200) {
        alert("Has ganado el juego ");
        break
    }
}