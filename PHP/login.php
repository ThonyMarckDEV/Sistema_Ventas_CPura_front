<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<style>
    .loader {
        border-width: 4px;
        border-style: solid;
        border-color: blue transparent blue transparent; /* Azul y transparente en los bordes alternos */
        border-radius: 50%; /* Bordes redondeados */
        width: 64px; /* Ancho del loader */
        height: 64px; /* Altura del loader */
        animation: spin 1s linear infinite; /* Animación de giro suave */
    }

    /* Definimos la animación de giro */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<body class="bg-gray-100 flex items-center justify-center h-screen">

    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-center text-2xl font-bold mb-6">💧CPURA</h2>
        <h3 class="text-center text-xl font-semibold text-gray-800 mb-6">Entre a su cuenta</h3>
        
        <!-- Formulario con id="loginForm" para ser capturado en JavaScript -->
        <form id="loginForm">
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico<span class="text-red-500">*</span></label>
                <input type="text" id="email" name="email" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="admin@admin.com" required>
            </div>

            <div class="mb-4 relative">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña<span class="text-red-500">*</span></label>
                <input type="password" id="password" name="password" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="••••••••" required>
            </div>

            <button type="submit" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Entrar
            </button>
        </form>

        <!-- Enlace de registro -->
        <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
                ¿Eres nuevo? <a href="registro.php" class="text-teal-500 font-semibold hover:underline">Regístrate aquí</a>
            </p>
        </div>

        <!-- Loader oculto que se mostrará durante el envío -->
        <div id="loadingScreen" class="hidden fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div class="loader"></div>
        </div>
    </div>

    <!-- Script de autenticación -->
    <script type="module" src="../../js/login.js"></script>

    <!-- Loader -->
    <?php include 'loader.php'; ?>
    <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="../../js/click-sound.js"></script>
    <script type="module" src="../../js/typing-sound.js"></script>
</body>
</html>
