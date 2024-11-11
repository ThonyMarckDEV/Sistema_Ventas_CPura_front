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

        // Mostrar el loader al enviar el formulario
        document.getElementById("loadingScreen").classList.remove("hidden");

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
            // Reproducir el sonido success
            var sonido = new Audio('../../songs/success.mp3'); // Asegúrate de que la ruta sea correcta
            sonido.play().catch(function(error) {
                console.error("Error al reproducir el sonido:", error);
            });
            //=============================================================
           showNotification("Productos agregados al carrito exitosamente", "bg-green-500");
            hideModal();
            // Ocultar el loader después de la operación
             document.getElementById("loadingScreen").classList.add("hidden");
        } else {
               // Ocultar el loader después de la operación
               document.getElementById("loadingScreen").classList.add("hidden");
             // Reproducir el sonido error
             var sonido = new Audio('../../songs/error.mp3'); // Asegúrate de que la ruta sea correcta
             sonido.play().catch(function(error) {
                 console.error("Error al reproducir el sonido:", error);
             });
             //=============================================================
            showNotification("Error al agregar productos al carrito", "bg-red-500");
        }
    } catch (error) {
           // Ocultar el loader después de la operación
           document.getElementById("loadingScreen").classList.add("hidden");
        console.error("Error:", error);
        alert("Error al agregar producto al carrito");
    }
}

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


document.getElementById("incrementBtn").addEventListener("click", () => updateCantidad(true));
document.getElementById("decrementBtn").addEventListener("click", () => updateCantidad(false));
document.getElementById("addToCartBtn").addEventListener("click", agregarAlCarrito);
document.getElementById("closeModalBtn").addEventListener("click", hideModal);
// Agrega esta línea al final de fetchProductos.js
window.showModal = showModal;
