<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sobre Nosotros</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Animaciones */
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }

        .fade-out {
            animation: fadeOut 1s ease forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    </style>
</head>
<body class="bg-blue-800 text-white font-sans flex items-center justify-center min-h-screen">
    <!-- Contenedor Principal -->
    <section class="fade-in flex flex-col items-center lg:flex-row lg:justify-between lg:px-24 py-12 lg:py-24 space-y-8 lg:space-y-0">
        <!-- Imagen Representativa Izquierda -->
        <div class="px-6 lg:px-0">
            <img src="../img/cpuralogo.jpg" alt="Sobre CPURA" class="w-80 h-80 rounded-lg shadow-lg object-cover">
        </div>
        <!-- Contenido de Texto Derecho -->
        <div class="text-center lg:text-left lg:max-w-md px-6">
            <h1 class="text-4xl lg:text-5xl font-bold text-teal-400 leading-tight mb-4">Sobre Nosotros</h1>
            <p class="text-lg text-gray-200 mb-6">Somos CPURA, una empresa dedicada a ofrecer agua de alta calidad para una vida más saludable. Nuestra misión es cuidar tu salud con cada gota.</p>
            <p class="text-teal-300 font-medium">#CUIDATUCUERPO</p>
        </div>
    </section>

    <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="../js/click-sound.js"></script>
    <script type="module" src="../js/typing-sound.js"></script>
</body>
</html>
