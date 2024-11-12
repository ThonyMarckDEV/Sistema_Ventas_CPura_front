import API_BASE_URL from './urlHelper.js';

// Agregar un evento para verificar el token almacenado al cargar la página
document.addEventListener("DOMContentLoaded", checkStoredToken);

async function checkStoredToken() {
    console.log("Verificando token almacenado");
    const token = localStorage.getItem("jwt");
    const justLoggedIn = localStorage.getItem("justLoggedIn");

    if (justLoggedIn) {
        localStorage.removeItem("justLoggedIn");
    }

    if (token) {
        const decodedToken = parseJwt(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken && decodedToken.exp <= currentTime) {
            console.log("Token expirado. Cambiando estado del usuario a 'loggedOff'...");
            await changeUserStatusToLoggedOff(decodedToken.idUsuario);
            clearAuthData();
        } else if (decodedToken && decodedToken.exp > currentTime) {
            const status = await checkUserStatus(decodedToken.idUsuario);

            if (status === 'loggedOff') {
                console.log("Usuario está 'loggedOff' en la base de datos. Cerrando sesión...");
                clearAuthData();
            } else if (status === 'loggedOn') {
                console.log("Usuario activo. Verificando redirección según rol...");
                handleRedirection(token);
            } else {
                console.error("Estado del usuario no reconocido. Cerrando sesión...");
                clearAuthData();
            }
        } else {
            clearAuthData();
        }
    }
}

// Función para manejar la redirección basada en el rol del usuario
function handleRedirection(token) {
    const decodedToken = parseJwt(token);
    const rol = decodedToken.rol;

    switch (rol) {
        case "admin":
            window.location.href = "../PHP/ADMINPHP/Admin.php";
            break;
        case "cliente":
            window.location.href = "../PHP/CLIENTEPHP/Cliente.php";
            break;
        default:
            alert("Rol no reconocido");
            break;
    }
}

// Función para decodificar el JWT
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
}

// Función para limpiar datos de autenticación
function clearAuthData() {
    console.log("Limpiando datos de autenticación...");
    localStorage.removeItem("jwt");
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
}

// Función para cambiar el estado del usuario a 'loggedOff' en la base de datos
async function changeUserStatusToLoggedOff(idUsuario) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idUsuario })
        });
        console.log("Estado del usuario cambiado a 'loggedOff'");
    } catch (error) {
        console.error("Error al cambiar el estado del usuario a 'loggedOff':", error);
    }
}

// Función para verificar el estado del usuario en la base de datos
async function checkUserStatus(idUsuario) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/check-status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idUsuario })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("Estado del usuario en la base de datos:", data.status);
            return data.status;
        } else {
            console.error("Error al verificar el estado del usuario en la base de datos");
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud de verificación del estado del usuario:", error);
        return null;
    }
}
