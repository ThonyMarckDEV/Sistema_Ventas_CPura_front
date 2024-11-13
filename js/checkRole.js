    // checkRole.js

import API_BASE_URL from './urlHelper.js';

const token = localStorage.getItem("jwt");

document.addEventListener("DOMContentLoaded", function() {
    console.log("Iniciando verificación de token almacenado...");

    // Verificación inicial del token
    if (!token) {
        console.log("No se encontró token en localStorage, redirigiendo al login...");
        redirectToLogin();
        return;
    }

    // Decodifica el token para obtener el rol y el idUsuario
    const decodedToken = parseJwt(token);
    const rol = decodedToken.rol;
    const idUsuario = decodedToken.idUsuario;

    console.log("Rol del usuario:", rol);
    console.log("ID de usuario:", idUsuario);

    // Función para desloguear y redirigir
    function logoutAndRedirect() {
        console.log("Iniciando proceso de deslogueo...");
        fetch(`${API_BASE_URL}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idUsuario }) // Enviar idUsuario en el cuerpo de la solicitud
        })
        .catch(error => console.error("Error al intentar desloguear al usuario:", error))
        .finally(() => {
            console.log("Token eliminado de localStorage y cookies. Redirigiendo al login...");
            // Eliminar el token de localStorage y cookie
            localStorage.removeItem("jwt");
            document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Elimina la cookie
            redirectToLogin();
        });
    }

    // Función para verificar el estado del usuario
    async function checkUserStatus() {
        console.log("Verificando estado del usuario con la API...");
        try {
            const response = await fetch(`${API_BASE_URL}/api/check-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idUsuario, token })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Respuesta de estado recibida:", data);
                
                // Condicionales de estado y rol
                if (data.status === 'loggedOff') {
                    console.log("Estado del usuario: deslogueado. Redirigiendo...");
                    logoutAndRedirect();
                } else if (data.status === 'invalidToken') {
                    console.log("Estado del token: inválido. Redirigiendo...");
                    logoutAndRedirect();
                } else if (data.status === 'loggedOn') {
                    console.log("Estado del usuario: activo. Procediendo a verificar rol...");
                    verifyUserRole();
                }
            } else {
                console.log("Error en la respuesta al verificar el estado, redirigiendo...");
                logoutAndRedirect();
            }
        } catch (error) {
            console.error("Error en la solicitud de verificación del estado del usuario:", error);
            logoutAndRedirect();
        }
    }

    // Función para verificar el rol del usuario y la ruta
    function verifyUserRole() {
        const currentPath = window.location.pathname;
        console.log("Verificando rol del usuario con la ruta actual:", currentPath);

        if (currentPath.includes("/ADMINPHP") && rol !== "admin") {
            console.log("Acceso no autorizado: usuario sin rol de admin. Redirigiendo...");
            alert("Acceso no autorizado. Redirigiendo...");
            logoutAndRedirect();
        } else if (currentPath.includes("/CLIENTEPHP") && rol !== "cliente") {
            console.log("Acceso no autorizado: usuario sin rol de cliente. Redirigiendo...");
            alert("Acceso no autorizado. Redirigiendo...");
            logoutAndRedirect();
        } else {
            console.log("Acceso autorizado para el rol:", rol);
        }
    }

    // Llama a la verificación del estado del usuario
    checkUserStatus();
});

// Función para redirigir al login
function redirectToLogin() {
    console.log("Redirigiendo al login...");
    window.location.href = "../../index.php";
}

// Función para decodificar el JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    
    return JSON.parse(jsonPayload);
}
