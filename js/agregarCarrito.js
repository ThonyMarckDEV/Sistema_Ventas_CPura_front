import API_BASE_URL from './urlHelper.js';

let selectedProductId = null;

export function showModal(idProducto, nombreProducto) {
    selectedProductId = idProducto;
    const modal = document.getElementById("modal");
    document.getElementById("modalProductName").textContent = nombreProducto;
    document.getElementById("cantidadInput").value = 1; // Iniciar con cantidad 1
    modal.classList.remove("hidden");
}

// Ocultar el modal
function hideModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Incrementar o decrementar la cantidad
function updateCantidad(increment) {
    const cantidadInput = document.getElementById("cantidadInput");
    let cantidad = parseInt(cantidadInput.value);
    cantidad = increment ? cantidad + 1 : cantidad - 1;
    cantidadInput.value = cantidad > 0 ? cantidad : 1; // Evitar valores negativos
}

// Agregar producto al carrito
async function agregarAlCarrito() {
    const token = localStorage.getItem("jwt");
    const cantidad = document.getElementById("cantidadInput").value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/agregarCarrito`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                idProducto: selectedProductId,
                cantidad: cantidad
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Producto agregado al carrito con éxito");
            hideModal();
        } else {
            alert("Error al agregar producto: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al agregar producto al carrito");
    }
}

document.getElementById("incrementBtn").addEventListener("click", () => updateCantidad(true));
document.getElementById("decrementBtn").addEventListener("click", () => updateCantidad(false));
document.getElementById("addToCartBtn").addEventListener("click", agregarAlCarrito);
document.getElementById("closeModalBtn").addEventListener("click", hideModal);
// Agrega esta línea al final de fetchProductos.js
window.showModal = showModal;
