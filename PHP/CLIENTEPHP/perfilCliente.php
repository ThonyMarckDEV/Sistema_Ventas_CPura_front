<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cliente</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        .profile-img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
        }
    </style>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">

    <!-- Contenedor de Notificación -->
    <div id="notification" style="display: none;" class="fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white font-semibold text-center rounded shadow-md"></div>

    <!-- Sidebar -->
    <?php include 'sidebarCLIENTE.php'; ?>

    <!-- Contenido Principal -->
    <div class="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 max-w-4xl w-full">
        
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-800">Perfil Cliente</h2>

        <!-- Imagen de Perfil -->
        <div class="flex justify-center mb-6">
            <form id="uploadForm" enctype="multipart/form-data" class="flex flex-col items-center">
                <input type="hidden" id="idUsuario" value="<!-- ID del docente cargado dinámicamente -->">
                <img src="" alt="Perfil" id="profileImage" class="profile-img border-2 border-gray-300 shadow-md mb-3 cursor-pointer" onclick="openImageModal()">
                <input type="file" id="profileInput" name="perfil" accept="image/*" class="mt-2 block w-full text-center">
                <button type="button" onclick="uploadProfileImage()" class="w-full bg-black text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 mt-2">Actualizar Foto</button>
            </form>
        </div>

        <!-- Modal de Imagen de Perfil -->
        <div id="imageModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden">
            <div class="relative bg-white rounded-lg p-4 max-w-sm w-full mx-4">
                <button onclick="closeImageModal()" class="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold">&times;</button>
                <img src="" alt="Perfil Ampliado" id="modalProfileImage" class="w-full h-auto rounded-lg">
            </div>
        </div>

        <script>
            function openImageModal() {
                document.getElementById("modalProfileImage").src = document.getElementById("profileImage").src;
                document.getElementById("imageModal").classList.remove("hidden");
            }

            function closeImageModal() {
                document.getElementById("imageModal").classList.add("hidden");
            }
        </script>

        <!-- Formulario de Actualización de Datos -->
        <form id="updateForm" class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
            <div>
                <label for="nombres" class="block text-gray-700 font-semibold">Nombres</label>
                <input type="text" id="nombres" name="nombres" required 
                    class="w-full px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0" 
                    readonly>
            </div>
            <div>
                <label for="apellidos" class="block text-gray-700 font-semibold">Apellidos</label>
                <input type="text" id="apellidos" name="apellidos" required 
                    class="w-full px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0" 
                    readonly>
            </div>
            <div>
                <label for="dni" class="block text-gray-700 font-semibold">DNI</label>
                <input type="text" id="dni" name="dni" maxlength="8" required 
                    class="w-full px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0" 
                    readonly>
            </div>
            <div>
                <label for="correo" class="block text-gray-700 font-semibold">Correo</label>
                <input type="email" id="correo" name="correo" required class="w-full px-4 py-2 border rounded-lg">
            </div>
            <div>
                <label for="edad" class="block text-gray-700 font-semibold">Edad</label>
                <input type="number" id="edad" name="edad" required class="w-full px-4 py-2 border rounded-lg">
            </div>
            <div>
                <label for="nacimiento" class="block text-gray-700 font-semibold">Fecha de Nacimiento</label>
                <input type="date" id="nacimiento" name="nacimiento" required class="w-full px-4 py-2 border rounded-lg">
            </div>
            <div>
                <label for="sexo" class="block text-gray-700 font-semibold">Sexo</label>
                <select id="sexo" name="sexo" required class="w-full px-4 py-2 border rounded-lg">
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </select>
            </div>
            <div>
                <label for="direccion" class="block text-gray-700 font-semibold">Dirección</label>
                <input type="text" id="direccion" name="direccion" required class="w-full px-4 py-2 border rounded-lg">
            </div>
            <div>
                <label for="telefono" class="block text-gray-700 font-semibold">Teléfono</label>
                <input type="text" id="telefono" name="telefono" required class="w-full px-4 py-2 border rounded-lg">
            </div>
            <div>
                <label for="departamento" class="block text-gray-700 font-semibold">Departamento</label>
                <input type="text" id="departamento" name="departamento" required class="w-full px-4 py-2 border rounded-lg">
            </div>

            <div class="col-span-full text-center mt-4">
                <button type="button" onclick="updateCliente()" class="w-full bg-black text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400">Guardar Cambios</button>
            </div>
        </form>
    </div>

        <!-- Pantalla de carga -->
    <div id="loadingScreen" class="hidden fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <!-- Puedes agregar un spinner aquí -->
        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>

    <!-- Scripts de manejo de imagen y actualización -->
    <script type="module" src="../../js/perfilCliente.js"></script>
</body>
</html> 
