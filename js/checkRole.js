// checkRole.js

import API_BASE_URL from './urlHelper.js';

document.addEventListener("DOMContentLoaded", function() {
    console.log("Verificando token almacenado");
    const token = localStorage.getItem("jwt");

    if (!token) {
        window.location.href = "../../index.php";
        return;
    }

    // Decodificar el token
    const decodedToken = parseJwt(token);
    const rol = decodedToken.rol;

    // Obtener el directorio actual para determinar el rol
    const currentPath = window.location.pathname;

    // Función para desloguear y redirigir
    function logoutAndRedirect() {
        fetch(`${API_BASE_URL}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idUsuario: decodedToken.idUsuario }) // Enviar idUsuario en el cuerpo
        })
        .catch(error => console.error("Error al desloguear al usuario:", error))
        .finally(() => {
            // Eliminar el token y redirigir
            localStorage.removeItem("jwt");
            document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Borrar la cookie
            window.location.href = "../../index.php";
        });
    }

    // Verificar el rol del usuario y la ruta
    if (currentPath.includes("/ADMINPHP") && rol !== "admin") {
       alert("Acceso no autorizado.");
        logoutAndRedirect();
    } else if (currentPath.includes("/CLIENTEPHP") && rol !== "cliente") {
        alert("Acceso no autorizado.");
        logoutAndRedirect();
    }
});

// Función para decodificar el JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload);
}
