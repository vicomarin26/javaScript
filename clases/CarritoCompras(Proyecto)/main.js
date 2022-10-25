const db = {
    methods: {
        find: (id) => {
            return db.items.find((item) => item.id === id);
        },
        remove: (items) => {
            items.forEach((item) => {
                const product = db.methods.find(item.id);
                product.qty = product.qty - item.qty;
            });

            console.log(db);
        },
    },
    items: [{
            id: 0,
            title: "Polarizado auto seda/hasback",
            price: 1000,
            qty: 0,
        },
        {
            id: 1,
            title: "Paint Protection Film (PPF)",
            price: 30000,
            qty: 5,
        },
        {
            id: 2,
            title: "Wrap Vinil Mate ",
            price: 20000,
            qty: 0,
        },
        {
            id: 3,
            title: "Wrap Vinil Tornazol",
            price: 25000,
            qty: 80,
        },
    ],
};

const shoppingCart = {
    items: [],
    methods: {
        add: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);
            if (cartItem) {
                if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
                    cartItem.qty++;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Rayos...',
                        text: 'De momento no hay más existentes!',
                    })
                }
            } else {
                shoppingCart.items.push({ id, qty });
            }
        },
        remove: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);

            if (cartItem.qty - 1 > 0) {
                cartItem.qty--;
            } else {
                shoppingCart.items = shoppingCart.items.filter(
                    (item) => item.id !== id
                );
            }
        },
        count: () => {
            return shoppingCart.items.reduce((acc, item) => acc + item.qyt, 0);
        },
        get: (id) => {
            const index = shoppingCart.items.findIndex((item) => item.id === id);
            return index >= 0 ? shoppingCart.items[index] : null;
        },
        getTotal: () => {
            let total = 0;
            shoppingCart.items.forEach((item) => {
                const found = db.methods.find(item.id);
                total += found.price * item.qty;
            });
            return total;
        },
        hasInventory: (id, qty) => {
            return db.items.find((item) => item.id === id).qty - qty >= 0;
        },
        purchase: () => {
            // db.methods.remove(shoppingCart.items);
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Deseas finalizar la compra?',
                text: "Una vez realizada la compra no existen devoluciones!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, finalizar compra!',
                cancelButtonText: 'No, cancelar compra!',
                reverseButtons: false
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Tu compra a sido confirmada. ',
                        'En breve recibiras un correo para cangear tu compra!',
                        'success'
                    )
                    document.querySelector("#shopping-cart-container").classList.remove("show");
                    document.querySelector("#shopping-cart-container").classList.add("hide");
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'Puedes continuar comprando :)',
                        'error'
                    )
                    document.querySelector("#shopping-cart-container").classList.remove("show");
                    document.querySelector("#shopping-cart-container").classList.add("hide");
                }
            })

        },
    },
};

renderStore();

function renderStore() {
    const html = db.items.map((item) => {
        return `
        <div class="item">
            <div class="title">${item.title}</div>
            <div class="price">${numberToCurrency(item.price)}</div>
            <div class="qty">${item.qty} unidades</div>
            <div class="actions"><button class="add buttonA" data-id="${
              item.id
            }">Añadir al carrito de la compra</button></div>
        </div>`;
    });

    document.querySelector("#store-container").innerHTML = html.join("");

    document.querySelectorAll(".item .actions .add").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = parseInt(button.getAttribute("data-id"));
            const item = db.methods.find(id);

            if (item && item.qty - 1 > 0) {
                shoppingCart.methods.add(id, 1);
                console.log(db, shoppingCart);
                guardar_localStorage('Productos', db);
                guardar_localStorage('ProductosEnCesta', shoppingCart);
                renderShoppingCart();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se agrego producto correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Rayos...',
                    text: 'Ya no hay existencia de ese artículo!',
                })
            }
        });
    });
}

function renderShoppingCart() {
    const html = shoppingCart.items.map((item) => {
        const dbItem = db.methods.find(item.id);
        return `
            <div class="item">
                <div class="title">${dbItem.title}</div>
                <div class="price">${numberToCurrency(dbItem.price)}</div>
                <div class="qty">${item.qty} unidades</div>
                <div class="subtotal">Subtotal: ${numberToCurrency(
                  item.qty * dbItem.price
                )}</div>
                <div class="actions">
                    <button class="addOne buttonA" data-id="${dbItem.id}">+</button>
                    <button class="removeOne buttonA" data-id="${dbItem.id}">-</button>
                </div>
            </div>
        `;
    });
    const closeButton = `
  <div class="cart-header">
    <button id="bClose">Close</button>
  </div>`;
    const purchaseButton =
        shoppingCart.items.length > 0 ?
        `<div class="actions">
    <button id="bPurchase">Terminar compra</button>
  </div>` :
        "";
    const total = shoppingCart.methods.getTotal();
    guardar_localStorage('Compras', total);
    const totalDiv = `<div class="total">Total: ${numberToCurrency(total)}</div>`;
    document.querySelector("#shopping-cart-container").innerHTML =
        closeButton + html.join("") + totalDiv + purchaseButton;

    document.querySelector("#shopping-cart-container").classList.remove("hide");
    document.querySelector("#shopping-cart-container").classList.add("show");

    document.querySelectorAll(".addOne").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = parseInt(button.getAttribute("data-id"));
            shoppingCart.methods.add(id, 1);
            renderShoppingCart();
        });
    });

    document.querySelectorAll(".removeOne").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = parseInt(button.getAttribute("data-id"));
            shoppingCart.methods.remove(id, 1);
            renderShoppingCart();
        });
    });

    document.querySelector("#bClose").addEventListener("click", (e) => {
        document.querySelector("#shopping-cart-container").classList.remove("show");
        document.querySelector("#shopping-cart-container").classList.add("hide");
    });
    const bPurchase = document.querySelector("#bPurchase");
    if (bPurchase) {
        bPurchase.addEventListener("click", (e) => {
            shoppingCart.methods.purchase();

        });
    }
}

function numberToCurrency(n) {
    return new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 2,
        style: "currency",
        currency: "USD",
    }).format(n);
}


const traerDatos = async() => {
    const lista = document.getElementById("lista");
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        data.forEach((publicacion) => {
            const div = document.createElement("div");
            div.innerHTML = `
            <div class="item">
            <div><div>
            <div  class="title">User: ${publicacion.title}</div>
            <div  class="price">$${publicacion.price}</div>
            <div  class="qty"> ${publicacion.qty} Unidades</div>
            <div class="actions"><button class="add buttonB" data-id="${
                publicacion.id
              }">Añadir al carrito de la compra</button></div>
            </div>
            `;

            lista.append(div);
        });
    } catch (error) {
        console.log(error);
    }
};

traerDatos();
let nombreStorage, respuestaStorage;

function guardar_localStorage(nombreStorage, respuestaStorage) {
    localStorage.setItem(nombreStorage, JSON.stringify(respuestaStorage));
}