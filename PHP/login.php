<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .fade-in { animation: fadeIn 1s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .loader {
            border-width: 4px;
            border-style: solid;
            border-color: blue transparent blue transparent;
            border-radius: 50%;
            width: 64px;
            height: 64px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>

<body class="bg-blue-800 flex items-center justify-center h-screen">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md fade-in">
        <h2 class="text-center text-2xl font-bold mb-6">💧CPURA</h2>
        <h3 class="text-center text-xl font-semibold text-gray-800 mb-6">Entre a su cuenta</h3>
        
        <form id="loginForm">
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico<span class="text-red-500">*</span></label>
                <input type="text" id="email" name="email" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="admin@admin.com" required>
            </div>
            <div class="mb-4 relative">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña<span class="text-red-500">*</span></label>
                <input type="password" id="password" name="password" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="••••••••" required>
            </div>
            <button type="submit" class="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Entrar</button>
        </form>

        <div class="mt-4 text-center">
            <button id="forgotPasswordButton" class="text-blue-900 font-semibold hover:underline">¿Olvidaste tu contraseña?</button>
        </div>
        <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
                ¿Eres nuevo? <a href="registro.php" class="text-blue-900 font-semibold hover:underline">Regístrate aquí</a>
            </p>
        </div>
    </div>

    <!-- loader.php -->
    <div id="loadingScreen" class="hidden fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center" style="z-index: 99999;">
        <div class="loader animate-spin rounded-full h-16 w-16 border-4 border-solid border-blue-500 border-t-transparent"></div>
    </div>


    <!-- Modal para Solicitar Código de Verificación -->
    <div id="resetPasswordModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
            <form id="resetPasswordForm">
                <label for="resetEmail" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input type="email" id="resetEmail" class="w-full p-2 mt-1 border border-gray-300 rounded-lg" placeholder="admin@admin.com" required>
                <button type="button" id="sendCodeButton" class="mt-4 bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full">Enviar Código</button>
            </form>
        </div>
    </div>

    <!-- Modal para Ingresar Código de Verificación -->
    <div id="verifyCodeModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">Verificar Código</h2>
            <form id="verifyCodeForm">
                <label for="verificationCode" class="block text-sm font-medium text-gray-700">Código de Verificación</label>
                <input type="text" id="verificationCode" class="w-full p-2 mt-1 border border-gray-300 rounded-lg" required>
                <button type="button" id="verifyCodeButton" class="mt-4 bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full">Verificar Código</button>
            </form>
        </div>
    </div>

    <!-- Modal para Cambiar Contraseña -->
    <div id="changePasswordModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
            <form id="changePasswordForm">
                <label for="newPassword" class="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                <input type="password" id="newPassword" class="w-full p-2 mt-1 border border-gray-300 rounded-lg" required>
                <button type="button" id="changePasswordButton" class="mt-4 bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full">Cambiar Contraseña</button>
            </form>
        </div>
    </div>

    <!-- Scripts -->
    <script type="module" src="../../js/login.js"></script>
    <script type="module" src="../../js/reset-password.js"></script>
</body>
</html>

 <!-- Scripts -->
 <script type="module">
        import { openResetPasswordModal, sendVerificationCode, verifyCode, changePassword } from '../../js/reset-password.js';

        document.getElementById("forgotPasswordButton").addEventListener("click", openResetPasswordModal);
        document.getElementById("sendCodeButton").addEventListener("click", sendVerificationCode);
        document.getElementById("verifyCodeButton").addEventListener("click", verifyCode);
        document.getElementById("changePasswordButton").addEventListener("click", changePassword);
    </script>