import API_BASE_URL from './urlHelper.js';

const token = localStorage.getItem("jwt");


// Función para cargar los productos del carrito
function loadCartProducts() {
    fetch(`${API_BASE_URL}/api/carrito`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar productos del carrito");
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos del carrito:", data); // Añade esta línea
        if (data && data.data) {
            renderCartTable(data.data); // Solo llama a renderCartTable si data está definido
        } else {
            console.error("Datos del carrito no encontrados o vacíos.");
        }
    })
    .catch(error => console.error("Error al cargar productos del carrito:", error));
}

// Función para renderizar la tabla del carrito
function renderCartTable(products) {
    const tableBody = document.querySelector("#cartTableBody");
    tableBody.innerHTML = ""; // Limpia el contenido anterior

    let total = 0; // Variable para acumular el total del carrito

    products.forEach(product => {
        console.log("Producto:", product); // Depuración

        // Verificar y convertir 'precio' y 'cantidad' a número
        const precio = Number(product.precio);
        const cantidad = Number(product.cantidad);

        if (isNaN(precio) || isNaN(cantidad)) {
            console.error(`Precio o cantidad inválidos para el producto ID: ${product.idProducto}`);
            return; // Salta este producto
        }

        const subtotal = precio * cantidad;
        total += subtotal; // Acumula el subtotal al total

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.nombreProducto}</td>
            <td>
                <input type="number" min="1" value="${cantidad}" 
                    data-id="${product.idProducto}" 
                    class="cantidad-input w-16 px-2 py-1 border rounded">
            </td>
            <td>$${precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button onclick="removeProduct(${product.idProducto})" class="bg-red-500 text-white px-2 py-1 rounded">
                    Eliminar
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Actualizar el total en la interfaz
    document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;

    // Añadir eventos a los inputs de cantidad
    const cantidadInputs = document.querySelectorAll(".cantidad-input");
    cantidadInputs.forEach(input => {
        input.addEventListener("change", handleQuantityChange);
        input.addEventListener("blur", handleQuantityChange);
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleQuantityChange.call(this, event);
            }
        });
    });
}

// Función para manejar el cambio de cantidad
function handleQuantityChange(event) {
    const input = event.target;
    const idProducto = input.getAttribute("data-id");
    const nuevaCantidad = Number(input.value);

    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        alert("Cantidad inválida. Por favor, ingresa un número mayor o igual a 1.");
        // Restaurar el valor anterior si es inválido
        input.value = 1;
        return;
    }

    updateQuantity(idProducto, nuevaCantidad);
}

// Función para actualizar la cantidad de un producto
function updateQuantity(idProducto, cantidad) {
    fetch(`${API_BASE_URL}/api/carrito_detalle/${idProducto}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cantidad })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || "Error al actualizar cantidad");
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            loadCartProducts(); // Recargar el carrito
        } else {
            console.error("Error al actualizar cantidad:", data.message);
            alert("Error al actualizar la cantidad: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error al actualizar cantidad:", error);
        alert("Hubo un error al actualizar la cantidad. Por favor, intenta nuevamente.");
    });
}

// Función para eliminar un producto del carrito
function removeProduct(idProducto) {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")) {
        return;
    }

    fetch(`${API_BASE_URL}/api/carrito_detalle/${idProducto}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || "Error al eliminar producto");
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            loadCartProducts(); // Recargar el carrito
        } else {
            console.error("Error al eliminar producto:", data.message);
            alert("Error al eliminar el producto: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error al eliminar producto:", error);
        alert("Hubo un error al eliminar el producto. Por favor, intenta nuevamente.");
    });
}

// Cargar los productos del carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadCartProducts();
});

// Función para mostrar notificaciones
function showNotification(message, bgColor) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white font-semibold text-center ${bgColor} rounded shadow-md`;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 5000);
}


window.updateQuantity = updateQuantity;
window.removeProduct = removeProduct;
