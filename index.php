<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💧CPURA Landing-Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome para los Íconos Sociales -->
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <style>
        /* Efecto Parallax */
        .parallax {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        /* Efecto Hover en Productos */
        .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
            transform: scale(1.1);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        /* Animación de Fade-in */
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 1s forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body class="bg-white font-sans">
    <!-- Navegación -->
    <nav class="flex justify-between items-center p-4 lg:p-6 bg-blue-900 text-white">
        <a href="#" class="text-3xl font-bold text-white">💧CPURA</a>
        <ul class="hidden lg:flex space-x-8 font-medium">
            <li><a href="index.php" class="hover:text-blue-400">Inicio</a></li>
            <li><a href="./PHP/nosotros.php" class="hover:text-blue-400">Sobre Nosotros</a></li>
            <li><a href="./PHP/servicios.php" class="hover:text-blue-400">Servicios</a></li>
            <li><a href="./PHP/contacto.php" class="hover:text-blue-400">Contacto</a></li>
        </ul>
        <button class="lg:hidden text-white font-bold" id="menuButton">☰</button>
    </nav>

    <!-- Menú móvil -->
    <div id="mobileMenu" class="hidden lg:hidden flex flex-col items-center space-y-4 bg-blue-800 text-white font-medium mt-4 p-4">
        <a href="index.php" class="hover:text-blue-400">Inicio</a>
        <a href="./PHP/nosotros.php" class="hover:text-blue-400">Sobre Nosotros</a>
        <a href="./PHP/servicios.php" class="hover:text-blue-400">Servicios</a>
        <a href="./PHP/contacto.php" class="hover:text-blue-400">Contacto</a>
    </div>

    <!-- Sección Principal -->
    <section class="flex flex-col items-center justify-center lg:flex-row lg:justify-between lg:px-24 py-12 lg:py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <!-- Contenido de Texto Izquierdo -->
        <div class="text-center lg:text-left lg:max-w-md px-6">
            <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-4">Bebe más agua</h1>
            <p class="text-lg mb-6">El agua pura es la primera y más importante medicina del mundo.</p>
            <div class="flex justify-center lg:justify-start space-x-4 mb-4">
                <a href="./PHP/login.php" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-400 hover:text-white">Let's Start</a>
            </div>
            <p class="font-medium">#BEBEAUGAPURA</p>
        </div>

        <!-- Contenido de Imagen Derecha -->
        <div class="mt-8 lg:mt-0 lg:max-w-lg relative px-4 fade-in">
            <img src="./img/cpuralogo.jpg" alt="Agua pura" class="rounded-lg shadow-md w-full lg:w-auto">
            <div class="absolute top-12 right-10 font-semibold text-2xl rotate-12">Mantente Saludable</div>
        </div>
    </section>

    <!-- Sección de Productos -->
    <section class="flex flex-wrap justify-center gap-6 bg-blue-700 p-8">
        <div class="w-48 h-64 bg-blue-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center product-card fade-in transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-blue-600" style="animation-delay: 0.1s;">
            <img src="../../img/producto1.png" alt="Producto 1" class="w-32 h-40 mb-2 object-cover">
            <p class="font-semibold text-center">Agua CPURA</p>
        </div>
        <div class="w-48 h-64 bg-blue-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center product-card fade-in transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-blue-600" style="animation-delay: 0.2s;">
            <img src="../../img/producto2.png" alt="Producto 2" class="w-32 h-40 mb-2 object-cover">
            <p class="font-semibold text-center">CPURA Botella</p>
        </div>
        <div class="w-48 h-64 bg-blue-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center product-card fade-in transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-blue-600" style="animation-delay: 0.3s;">
            <img src="../../img/producto3.png" alt="Producto 3" class="w-32 h-40 mb-2 object-cover">
            <p class="font-semibold text-center">CPURA Garrafon</p>
        </div>
        <div class="w-48 h-64 bg-blue-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center product-card fade-in transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-blue-600" style="animation-delay: 0.4s;">
            <img src="../../img/producto4.png" alt="Producto 4" class="w-32 h-40 mb-2 object-cover">
            <p class="font-semibold text-center">CPURA Bidon Grande</p>
        </div>
    </section>

<!-- Sección de Video Mediano con Botón de Reproducción -->
<section class="bg-blue-900 py-20 flex justify-center items-center">
    <div class="relative w-full max-w-3xl h-auto">
        <!-- Video oculto inicialmente -->
        <video id="cpuraVideo" class="w-full h-auto rounded-lg shadow-2xl hidden" src="../../img/CpuraVideo.mp4" controls></video>
        
        <!-- Imagen de vista previa o fondo para el video -->
        <div id="videoOverlay" class="w-full h-full bg-black rounded-lg flex items-center justify-center">
            <img src="../../img/vistaprevia.png" alt="Vista previa de video" class="w-full h-auto rounded-lg">
           <!-- Botón de Reproducción -->
            <button id="playButton" class="absolute bg-red-600 p-6 rounded-full transition-all flex items-center justify-center hover:bg-red-700" style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; height: 80px;">
                <div class="play-icon" style="border-left: 15px solid white; border-top: 10px solid transparent; border-bottom: 10px solid transparent; margin-left: 5px;"></div>
            </button>
        </div>
    </div>
</section>

<!-- Scripts -->
<script>
    // Seleccionar elementos del DOM
    const video = document.getElementById('cpuraVideo');
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.getElementById('videoOverlay');

    // Función para reproducir el video y ocultar el botón
    playButton.addEventListener('click', () => {
        videoOverlay.classList.add('hidden'); // Oculta la vista previa y el botón
        video.classList.remove('hidden'); // Muestra el video
        video.play(); // Reproduce el video
    });
</script>


    <!-- Íconos de Redes Sociales -->
    <footer class="flex justify-center space-x-4 text-blue-900 p-4 bg-blue-200">
        <a href="https://www.facebook.com/cpuraoficial" class="hover:text-blue-600"><i class="fab fa-facebook-f"></i> Facebook</a>
        <a href="#" class="hover:text-blue-600"><i class="fab fa-twitter"></i> Twitter</a>
        <a href="#" class="hover:text-blue-600"><i class="fab fa-instagram"></i> Instagram</a>
    </footer>

    <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="./js/click-sound.js"></script>
    <script type="module" src="./js/typing-sound.js"></script>
    
    <!-- Script de autenticación -->
    <script type="module" src="./js/checkStorageTokenINDEX.js"></script>
    
    <!-- Script para mostrar/ocultar el menú móvil -->
    <script>
        const menuButton = document.getElementById('menuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Scroll suave para el efecto parallax
        window.addEventListener("scroll", function() {
            const elements = document.querySelectorAll(".fade-in");
            const scrollTop = window.scrollY;

            elements.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top + scrollTop;
                const delay = element.dataset.delay || 0;
                if (scrollTop + window.innerHeight - 100 > elementTop) {
                    element.style.animationDelay = `${delay}s`;
                    element.classList.add("fade-in");
                }
            });
        });
    </script>
</body>
</html>
