<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">

    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-center text-2xl font-bold mb-6">Registro de Usuario</h2>
        
        <form action="registro.php" method="POST">
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
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input type="password" id="password" name="password" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" required>
            </div>

            <button type="submit" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Registrar
            </button>
        </form>
    </div>

    <!-- Script que se encarga del logeo -->
    <script type="module" src="registro.js"></script>
    <!-- Loader -->
    <?php include 'loader.php'; ?>
    <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="../js/click-sound.js"></script>
    <script type="module" src="../js/typing-sound.js"></script>

</body>
</html>