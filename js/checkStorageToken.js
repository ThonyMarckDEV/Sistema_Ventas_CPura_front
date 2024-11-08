import API_BASE_URL from './urlHelper.js';

// Agregar un evento para verificar el token almacenado al cargar la página
document.addEventListener("DOMContentLoaded", checkStoredToken);

function checkStoredToken() {
    console.log("Verificando token almacenado");
    const token = localStorage.getItem("jwt");
    const justLoggedIn = localStorage.getItem("justLoggedIn");

    if (justLoggedIn) {
        localStorage.removeItem("justLoggedIn");
    }

    if (token) {
        const decodedToken = parseJwt(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken && decodedToken.exp <= currentTime && decodedToken.estado === 'loggedOn') {
            changeUserStatusToLoggedOff(decodedToken.idUsuario);
            clearAuthData();
        } else if (decodedToken && decodedToken.exp > currentTime && decodedToken.estado === 'loggedOn') {
            window.location.reload();
            if (!justLoggedIn) {
                handleRedirection(token);
            }
        } else {
            clearAuthData();
        }
    } else {

    }
}

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

function clearAuthData() {
    localStorage.removeItem("jwt");
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
}

async function changeUserStatusToLoggedOff(idUsuario) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idUsuario })
        });
        const data = await response.json();
    } catch (error) {
    }
}
