<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">

    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-center text-2xl font-bold mb-6">Laravel</h2>
        <h3 class="text-center text-xl font-semibold text-gray-800 mb-6">Entre a su cuenta</h3>
        
        <form action="login.php" method="POST">
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico<span class="text-red-500">*</span></label>
                <input type="email" id="email" name="email" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="admin@admin.com" required>
            </div>

            <div class="mb-4 relative">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña<span class="text-red-500">*</span></label>
                <input type="password" id="password" name="password" class="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="••••••••" required>
                <button type="button" onclick="togglePassword()" class="absolute inset-y-0 right-0 px-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.253.813-.64 1.569-1.136 2.24M4.929 4.929l14.142 14.142"/>
                    </svg>
                </button>
            </div>

            <div class="flex items-center mb-4">
                <input type="checkbox" id="remember" name="remember" class="h-4 w-4 text-teal-500 border-gray-300 rounded">
                <label for="remember" class="ml-2 block text-sm text-gray-700">Recordarme</label>
            </div>

            <button type="submit" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Entrar
            </button>
        </form>
    </div>

    <script>
        function togglePassword() {
            const password = document.getElementById("password");
            password.type = password.type === "password" ? "text" : "password";
        }
    </script>

    <script>
        function togglePassword() {
              const password = document.getElementById("password");
              password.type = password.type === "password" ? "text" : "password";
        }
    </script>
       <!-- Scrip que se encarga del logeo -->
       <script type="module" src="login.js"></script>
</body>
</html>
