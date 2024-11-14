import API_BASE_URL from './urlHelper.js';

export function openResetPasswordModal() {
    document.getElementById("resetPasswordModal").classList.remove("hidden");
}

export async function sendVerificationCode() {
    const email = document.getElementById("resetEmail").value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/send-verification-codeUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            alert("Código de verificación enviado. Revisa tu correo.");
            document.getElementById("resetPasswordModal").classList.add("hidden");
            document.getElementById("verifyCodeModal").classList.remove("hidden");
        } else {
            alert("No se pudo enviar el código. Verifica el correo ingresado.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function verifyCode() {
    const email = document.getElementById("resetEmail").value;
    const code = document.getElementById("verificationCode").value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/verify-codeUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code })
        });

        if (response.ok) {
            alert("Código verificado. Cambia tu contraseña.");
            document.getElementById("verifyCodeModal").classList.add("hidden");
            document.getElementById("changePasswordModal").classList.remove("hidden");
        } else {
            alert("Código incorrecto. Inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function changePassword() {
    const email = document.getElementById("resetEmail").value;
    const newPassword = document.getElementById("newPassword").value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/change-passwordUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword })
        });

        if (response.ok) {
            alert("Contraseña cambiada con éxito. Revisa tu correo.");
            document.getElementById("changePasswordModal").classList.add("hidden");
        } else {
            alert("No se pudo cambiar la contraseña. Inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
