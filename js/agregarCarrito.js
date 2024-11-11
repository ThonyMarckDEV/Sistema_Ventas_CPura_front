import API_BASE_URL from './urlHelper.js';
import { actualizarCantidadCarrito } from './contadorCarrito.js';

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

// Función para descifrar el JWT y obtener el payload
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export async function agregarAlCarrito() {
    const token = localStorage.getItem("jwt");
    const cantidad = document.getElementById("cantidadInput").value;

    // Extrae el idUsuario desde el token JWT
    const payload = parseJwt(token);
    const idUsuario = payload.idUsuario; // Ajusta el nombre de acuerdo a tu payload JWT

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
                cantidad: cantidad,
                idUsuario: idUsuario
            })
        });

        const data = await response.json();

        if (response.ok) {
            var sonido = new Audio('../../songs/success.mp3');
            sonido.play().catch(function(error) {
                console.error("Error al reproducir el sonido:", error);
            });
            showNotification("Productos agregados al carrito exitosamente", "bg-green-500");
            hideModal();
            actualizarCantidadCarrito();
        } else {
            var sonido = new Audio('../../songs/error.mp3');
            sonido.play().catch(function(error) {
                console.error("Error al reproducir el sonido:", error);
            });
            showNotification("Error al agregar productos al carrito", "bg-red-500");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al agregar producto al carrito");
    } finally {
        document.getElementById("loadingScreen").classList.add("hidden");
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