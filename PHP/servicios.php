<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Servicios</title>
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
        <!-- Contenido de Texto Izquierdo -->
        <div class="text-center lg:text-left lg:max-w-md px-6">
            <h1 class="text-4xl lg:text-5xl font-bold text-teal-400 leading-tight mb-4">Nuestros Servicios</h1>
            <p class="text-lg text-gray-200 mb-6">En CPURA ofrecemos servicios de alta calidad para que disfrutes de agua pura y saludable en cada momento.</p>
            <ul class="text-gray-300 space-y-2">
                <li>✔️ Distribución de agua embotellada</li>
                <li>✔️ Suministro para empresas y hogares</li>
                <li>✔️ Servicio de dispensadores de agua</li>
            </ul>
        </div>
        <!-- Imagen Representativa Derecha -->
        <div class="px-6 lg:px-0">
            <img src="../img/servicios.jpg" alt="Servicios de CPURA" class="w-80 h-80 rounded-lg shadow-lg object-cover">
        </div>
    </section>

    <!-- Incluir el script al final del body para mejorar la carga -->
    <script type="module" src="../js/click-sound.js"></script>
    <script type="module" src="../js/typing-sound.js"></script>
</body>
</html>
