import API_BASE_URL from './urlHelper.js';

import { verificarYRenovarToken } from './authToken.js';

export async function actualizarCantidadPedidosAdmin() { // Cambiado a Admin

    // Verificar y renovar el token antes de cualquier solicitud
    await verificarYRenovarToken();

    const token = localStorage.getItem("jwt");

    if (!token) {
        console.error("Token no encontrado");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/pedidos/cantidad`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const cantidad = data.cantidad || 0;

            // Actualiza la cantidad solo si es mayor a 0
            const pedidosCantidadElement = document.getElementById("pedidosCantidad");
            if (cantidad > 0) {
                pedidosCantidadElement.textContent = cantidad;
                pedidosCantidadElement.classList.remove("hidden");
            } else {
                pedidosCantidadElement.classList.add("hidden"); // Oculta si no hay pedidos
            }
        } else {
            console.error("Error al obtener la cantidad de pedidos");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Ejecuta la función al cargar la página
document.addEventListener("DOMContentLoaded", actualizarCantidadPedidosAdmin);