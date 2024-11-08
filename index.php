<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Agua</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome para los Íconos Sociales -->
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
</head>
<body class="bg-white font-sans">
    <!-- Navegación -->
    <nav class="flex justify-between items-center p-4 lg:p-6">
        <a href="#" class="text-3xl font-bold text-teal-500">💧</a>
        <ul class="hidden lg:flex space-x-8 text-gray-700 font-medium">
            <li><a href="#" class="hover:text-teal-500">Inicio</a></li>
            <li><a href="#" class="hover:text-teal-500">Sobre Nosotros</a></li>
            <li><a href="#" class="hover:text-teal-500">Servicios</a></li>
            <li><a href="#" class="hover:text-teal-500">Contacto</a></li>
        </ul>
        <button class="lg:hidden text-teal-500 font-bold" id="menuButton">☰</button>
    </nav>

    <!-- Menú móvil -->
    <div id="mobileMenu" class="hidden lg:hidden flex flex-col items-center space-y-4 text-gray-700 font-medium mt-4">
        <a href="#" class="hover:text-teal-500">Inicio</a>
        <a href="#" class="hover:text-teal-500">Sobre Nosotros</a>
        <a href="#" class="hover:text-teal-500">Servicios</a>
        <a href="#" class="hover:text-teal-500">Contacto</a>
    </div>

    <!-- Sección Principal -->
    <section class="flex flex-col items-center justify-center lg:flex-row lg:justify-between lg:px-24 py-12 lg:py-24">
        <!-- Contenido de Texto Izquierdo -->
        <div class="text-center lg:text-left lg:max-w-md px-6">
            <h1 class="text-4xl lg:text-5xl font-bold text-teal-700 leading-tight mb-4">Bebe más agua</h1>
            <p class="text-lg text-gray-600 mb-6">El agua pura es la primera y más importante medicina del mundo.</p>
            <div class="flex justify-center lg:justify-start space-x-4 mb-4">
                <a href="./PHP/login.php" class="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600">Let's Start</a>
            </div>
            <p class="text-gray-500 font-medium">#BEBEAUGAPURA</p>
        </div>

        <!-- Contenido de Imagen Derecha -->
        <div class="mt-8 lg:mt-0 lg:max-w-lg relative px-4">
            <img src="./img/cpuralogo.jpg" alt="Mujer bebiendo agua" class="rounded-lg shadow-md w-full lg:w-auto">
            <div class="absolute top-12 right-10 text-teal-600 font-semibold text-2xl rotate-12">Mantente Saludable</div>
        </div>
    </section>

    <!-- Íconos de Redes Sociales -->
    <footer class="flex justify-center space-x-4 mt-8 text-teal-500">
        <a href="#" class="hover:text-teal-600"><i class="fab fa-facebook-f"></i> Facebook</a>
        <a href="#" class="hover:text-teal-600"><i class="fab fa-twitter"></i> Twitter</a>
        <a href="#" class="hover:text-teal-600"><i class="fab fa-instagram"></i> Instagram</a>
    </footer>

    <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="./js/click-sound.js"></script>
    <script type="module" src="./js/typing-sound.js"></script>
    
</body>
</html>
    <!-- Script de autenticación -->
    <script type="module" src="./js/checkStorageTokenINDEX.js"></script>
        <!-- Script para mostrar/ocultar el login -->
    <script>
        // Script para el menú móvil
        const menuButton = document.getElementById('menuButton');
        const mobileMenu = document.getElementById('mobileMenu');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    </script>