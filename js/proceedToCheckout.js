import API_BASE_URL from './urlHelper.js';

const token = localStorage.getItem("jwt");

// Función para decodificar el JWT y extraer idCarrito y idUsuario
function getTokenPayload() {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
}

// Función para proceder al pago
function proceedToCheckout() {
    const totalText = document.getElementById("totalPrice").textContent;
    const total = parseFloat(totalText.replace('$', '').replace(',', ''));
    const payload = getTokenPayload();

    if (!payload) {
        showNotification("Error: No se encontró el token", "bg-red-500");
        return;
    }

    const idCarrito = payload.idCarrito;
    const idUsuario = payload.idUsuario; // Obtener idUsuario del token

    if (!idCarrito || !idUsuario) {
        showNotification("Error: No se encontró el carrito o el usuario", "bg-red-500");
        return;
    }

    fetch(`${API_BASE_URL}/api/pedido`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ total, idCarrito, idUsuario })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || "Error al proceder al pago");
            }).catch(() => {
                throw new Error("Error al proceder al pago");
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showNotification("Pedido y pago realizados con éxito", "bg-green-500");
            // Abrir la boleta en una nueva ventana
            window.open(`${API_BASE_URL}/boleta/${data.idPedido}`, '_blank');
            // Opcional: Vaciar el carrito en el frontend
            clearCartUI();
        } else {
            showNotification("Error al proceder al pago", "bg-red-500");
        }        
    })
    .catch(error => {
        console.error("Error al proceder al pago:", error);
        showNotification("Hubo un error al proceder al pago. Intenta nuevamente.", "bg-red-500");
    });
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

// Función para limpiar la interfaz del carrito
function clearCartUI() {
    const tableBody = document.querySelector("#cartTableBody");
    tableBody.innerHTML = "";
    document.getElementById("totalPrice").textContent = '$0.00';
}

// Asignar el evento al botón "Proceder al Pago"
document.getElementById("checkoutButton").addEventListener("click", proceedToCheckout);

window.proceedToCheckout = proceedToCheckout;
