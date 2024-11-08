import API_BASE_URL from './urlHelper.js';

function generateUsername(nombres, apellidos) {
    const primerNombre = nombres.trim().substring(0, 2).toUpperCase();
    const apellidoPaterno = apellidos.trim().split(" ")[0].toUpperCase();
    const inicialApellidoMaterno = apellidos.trim().split(" ")[1]?.[0]?.toUpperCase() || "";
    return `${primerNombre}${apellidoPaterno}${inicialApellidoMaterno}`;
}

// Lista de dominios de correos temporales conocidos
const temporaryEmailDomains = [
    '10minutemail.com',
    'temp-mail.org',
    'mailinator.com',
    // Agrega más dominios según sea necesario
];

function isTemporaryEmail(email) {
    const domain = email.split('@')[1].toLowerCase();
    return temporaryEmailDomains.includes(domain);
}

function isValidEmail(email) {
    // Expresión regular para validar el formato y dominio del correo electrónico
    const regex = /^[^\s@]+@gmail\.com$/i;
    return regex.test(email);
}

function validateFormData(data) {
    // Verificar que todos los campos estén llenados
    for (const [key, value] of Object.entries(data)) {
        if (!value.trim()) {
            showNotification(`El campo ${key} es obligatorio`, 'bg-red-500');
            return false;
        }
    }

    // Validar el formato del correo electrónico
    if (!isValidEmail(data.correo)) {
                    //=============================================================
             // Reproducir el sonido error
             var sonido = new Audio('../../songs/error.mp3');
             sonido.play().catch(function(error) {
                 console.error("Error al reproducir el sonido:", error);
             });           
            //=============================================================
        showNotification('El correo electrónico debe ser una dirección de Gmail válida', 'bg-red-500');
        return false;
    }

    // Verificar si el correo es temporal
    if (isTemporaryEmail(data.correo)) {
              //=============================================================
             // Reproducir el sonido error
             var sonido = new Audio('../../songs/error.mp3');
             sonido.play().catch(function(error) {
                 console.error("Error al reproducir el sonido:", error);
             });           
            //=============================================================
        showNotification('No se permiten correos temporales', 'bg-red-500');
        return false;
    }

    return true;
}

function submitRegisterForm() {
    const form = document.getElementById("userForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validar los datos antes de enviar
    if (!validateFormData(data)) {
        return;
    }

    // Generar el username basado en Nombres y Apellidos
    data.username = generateUsername(data.nombres, data.apellidos);
    data.rol = 'cliente';

    // Revisa los datos que se van a enviar
    console.log("Datos a enviar:", data);

    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.classList.remove("hidden");

    fetch(`${API_BASE_URL}/api/registerUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            console.error("Respuesta del servidor:", response);
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            new Audio('../../songs/success.mp3').play().catch(error => console.error("Error al reproducir el sonido:", error));
            showNotification("Usuario registrado exitosamente", "bg-green-500");
            form.reset();

            // Redirigir a login.php después de mostrar la notificación
            setTimeout(() => {
                window.location.href = 'login.php';
            }, 1700);
        } else {
            new Audio('../../songs/error.mp3').play().catch(error => console.error("Error al reproducir el sonido:", error));
            showNotification(data.message || "Error al registrar usuario", "bg-red-500");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showNotification("Error en la solicitud", "bg-red-500");
    })
    .finally(() => {
        loadingScreen.classList.add("hidden");
    });
}

function showNotification(message, bgColor) {
    const notification = document.getElementById("notification");
    if (notification) {
        notification.textContent = message;
        notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white font-semibold text-center ${bgColor} rounded shadow-md`;
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 5000);
    } else {
        console.error("No se encontró el elemento de notificación.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userForm").addEventListener("submit", event => {
        event.preventDefault();
        submitRegisterForm();
    });
});

window.submitRegisterForm = submitRegisterForm;
