import API_BASE_URL from './urlHelper.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchProductos();
});

async function fetchProductos() {
    const token = localStorage.getItem("jwt"); 

    try {
        const response = await fetch(`${API_BASE_URL}/api/productos`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error("Error al cargar productos");
        }

        const data = await response.json();
        displayProductos(data.data);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

function displayProductos(productos) {
    const tableBody = document.querySelector("#productosTable tbody");
    tableBody.innerHTML = "";

    productos.forEach(producto => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${producto.nombreProducto}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.nombreCategoria}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td><img src="${producto.imagen ? `${API_BASE_URL}/storage/${producto.imagen}` : '../../img/default-product.png'}" alt="${producto.nombreProducto}" class="w-20 h-20 object-cover rounded"></td>
            <td>
                <button onclick="agregarAlCarrito(${producto.idProducto})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Agregar al Carrito
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Función para el buscador
function buscarProducto() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#productosTable tbody tr");

    rows.forEach(row => {
        const productoNombre = row.children[0].innerText.toLowerCase();
        row.style.display = productoNombre.includes(input) ? "" : "none";
    });
}

// Función para agregar producto al carrito
function agregarAlCarrito(idProducto) {
    console.log(`Producto ${idProducto} agregado al carrito`);
    // ACA VA LA LOGICA PARA AGREGAR AL CARRITO HCERLA
}

window.agregarAlCarrito = agregarAlCarrito;
window.buscarProducto = buscarProducto;
