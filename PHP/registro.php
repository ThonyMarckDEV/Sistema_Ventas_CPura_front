<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .fade-in { animation: fadeIn 1s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .loader { border-width: 4px; border-style: solid; border-color: blue transparent blue transparent; border-radius: 50%; width: 64px; height: 64px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>

<body class="bg-blue-800 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md fade-in">
        <h2 class="text-center text-2xl font-bold mb-6">Registro de Usuario</h2>
        
        <form id="userForm">
            <!-- Campos del formulario -->
        <div class="mb-4">

            <label for="nombres" class="block text-gray-700 font-semibold">Nombres <span class="text-red-500">*</span></label>
            <input 
                type="text" 
                id="nombres" 
                name="nombres" 
                class="w-full mt-1 p-2 border border-gray-300 rounded-lg" 
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+" 
                title="Solo se permiten letras y espacios" 
                oninput="this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');" 
                required>
        </div>

         <!-- Apellidos (Obligatorio) -->
        <div>
            <label for="apellidos" class="block text-gray-700 font-semibold">Apellidos <span class="text-red-500">*</span></label>
            <input 
                type="text" 
                id="apellidos" 
                name="apellidos" 
                required 
                pattern="^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+)+$" 
                title="Debe ingresar dos apellidos separados por un espacio" 
                class="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
        </div>
        
           <!-- DNI (Obligatorio) -->
           <div>
                <label for="dni" class="block text-gray-700 font-semibold">DNI <span class="text-red-500">*</span></label>
                <input 
                    type="text" 
                    id="dni" 
                    name="dni" 
                    maxlength="8" 
                    required 
                    pattern="\d{8}" 
                    class="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                >
            </div>

            <!-- Correo (Obligatorio) -->
            <div>
                <label for="correo" class="block text-gray-700 font-semibold">Correo <span class="text-red-500">*</span></label>
                <input type="email" id="correo" name="correo" required class="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>


       <!-- Edad (Opcional) -->
            <div>
                <label for="edad" class="block text-gray-700 font-semibold">Edad <span class="text-gray-500">(Opcional)</span></label>
                <input 
                    type="text" 
                    id="edad" 
                    name="edad" 
                    maxlength="3" 
                    class="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                >
            </div>

            <!-- Contraseña -->
            <div>
                    <label for="password" class="block text-gray-700 font-semibold">Contraseña <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="password" id="password" name="password" required minlength="8" 
                            title="La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un símbolo"
                            class="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button type="button" onclick="togglePasswordVisibility('password')" 
                            class="absolute inset-y-0 right-0 px-3 text-gray-600 focus:outline-none">
                            👁️
                        </button>
                    </div>
                </div>

                <!-- Confirmar Contraseña -->
                <div>
                    <label for="password_confirmation" class="block text-gray-700 font-semibold">Confirmar Contraseña <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="password" id="password_confirmation" name="password_confirmation" required minlength="8" 
                            class="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button type="button" onclick="togglePasswordVisibility('password_confirmation')" 
                            class="absolute inset-y-0 right-0 px-3 text-gray-600 focus:outline-none">
                            👁️
                        </button>
                    </div>
                </div>

            <!-- Botón de Registro -->
            <button type="submit" class="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Registrar</button>
        </form>
    </div>

    <!-- Loader -->
    <div id="loadingScreen" class="hidden fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="loader"></div>
    </div>

    <!-- Notificación -->
    <div id="notification" style="display: none;"></div>

    <!-- Scripts -->
    <script type="module" src="../js/registerUser.js"></script>
    <script type="module" src="../../js/click-sound.js"></script>
    <script type="module" src="../../js/typing-sound.js"></script>
    <script>
        function togglePasswordVisibility(id) {
            const input = document.getElementById(id);
            if (input.type === "password") {
                input.type = "text";
            } else {
                input.type = "password";
            }
        }

        function validatePassword() {
            const password = document.getElementById('password').value;
            const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

            if (!regex.test(password)) {
                alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un símbolo.');
                return false;
            }
            return true;
        }
    </script>

</body>
</html>