class Producto {
    constructor(name, trademark, cantidad, price){
        this.name = name;
        this.trademark = trademark;
        this.cantidad = cantidad;
        this.price = price;
    }
}

let nombreUsuario;

document.getElementById("formulario-usuario").addEventListener("submit", manejadorFormularioUsuario);

function manejadorFormularioUsuario(e) {
    console.log(e);
    e.preventDefault();
    nombreUsuario = document.getElementById("user").value;

    const listadodeProductos = document.getElementById("listadodeProductos");
    const productos = JSON.parse(localStorage.getItem(nombreUsuario));

    if (productos == null) {
        listadodeProductos.innerHTML = "<h1>No hay productos para mostrar</h1>"
    } else {
        mostrarProductos(productos);
    }
    mostrarPanel();
}

function mostrarProductos(productos) {
    let listadodeProductos = document.getElementById("listadodeProductos");
    listadodeProductos.innerHTML = "";

    productos.forEach(producto => {
        let li = document.createElement("li");
        li.innerHTML = `
        <hr> ${producto.name.toUpperCase()} - ${producto.trademark} - ${producto.cantidad} gramos - ${producto.price}`;
        const botonBorrar = crearBotonEliminar(producto);
        li.appendChild(botonBorrar);
        listadodeProductos.appendChild(li);
    });
}

function crearBotonEliminar(producto) {
    const botonBorrar = document.createElement("button");
    botonBorrar.innerText = "Borrar";
    botonBorrar.addEventListener("click", () => {
        eliminarProducto(producto);
    })
    return botonBorrar;
}

function mostrarPanel() {
    const opciones = document.getElementById("opciones");

    opciones.innerHTML =
        `<h3>Bienvenido ${nombreUsuario}</h3>
        <form id="formulario-producto">
            <input type="text" id="name" placeholder="Nombre">
            <input type="text" id="trademark" placeholder="Marca">
            <input type="number" id="cantidad" placeholder="Cantidad">
            <input type="number" id="price" placeholder="Precio">
            <button type="submit">Agregar Producto</button>
        </form>`;
    
        document.getElementById("formulario-producto").addEventListener("submit", agregarProducto);
}

function agregarProducto(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const trademark = document.getElementById("trademark").value;
    const cantidad = document.getElementById("cantidad").value;
    const price = document.getElementById("price").value;

    const producto = new Producto(name, trademark, cantidad, price);

    const productosEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));

    if (productosEnLocalStorage == null) {
        localStorage.setItem(nombreUsuario, JSON.stringify([producto]));
        mostrarProductos([producto]);
    } else {
        productosEnLocalStorage.push(producto);
        localStorage.setItem(nombreUsuario, JSON.stringify(productosEnLocalStorage));
        mostrarProductos(productosEnLocalStorage);
    }
    e.target.reset();
}

function eliminarProducto(producto) {
    const productosEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));
    const nuevoArray = productosEnLocalStorage.filter(item => item.name != producto.name);
    localStorage.setItem(nombreUsuario, JSON.stringify(nuevoArray));
    mostrarProductos(nuevoArray);
}