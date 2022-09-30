const traerDatos = async() => {
    const lista = document.getElementById("lista");
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        data.forEach((publicacion) => {
            const li = document.createElement("li");
            li.innerHTML = `
        <h2>ID: ${publicacion.id}</h2>
        <p>User: ${publicacion.nombre}</p>
        <p>Precio: ${publicacion.precio}</p>
         <p>imagen: ${publicacion.body}</p>
      `;

            lista.append(li);
        });
    } catch (error) {
        console.log(error);
    }
};

traerDatos();