<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">

    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-center text-2xl font-bold mb-6">Registro de Usuario</h2>
        
        <form id="userForm">
            <div class="mb-4">
                <label for="nombres" class="block text-sm font-medium text-gray-700">Nombres</label>
                <input type="text" id="nombres" name="nombres" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>

            <div class="mb-4">
                <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos</label>
                <input type="text" id="apellidos" name="apellidos" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>

            <div class="mb-4">
                <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
                <input type="text" id="dni" name="dni" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>

            <div class="mb-4">
                <label for="correo" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input type="email" id="correo" name="correo" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>

            <div class="mb-4">
                <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="text" id="telefono" name="telefono" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>

            <div class="mb-4">
                <label for="edad" class="block text-sm font-medium text-gray-700">Edad</label>
                <input type="number" id="edad" name="edad" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>


            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input type="password" id="password" name="password" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>

            <button type="submit" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Registrar
            </button>
        </form>
    </div>

    <!-- Pantalla de carga -->
    <div id="loadingScreen" class="hidden fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <!-- Puedes agregar un spinner aquí -->
        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>

    <!-- Notificación -->
    <div id="notification" style="display: none;"></div>

    <!-- Importa tu archivo JavaScript -->
    <script type="module" src="../js/registerUser.js"></script>
        <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="../js/click-sound.js"></script>
    <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="../js/typing-sound.js"></script>
</body>
</html>
