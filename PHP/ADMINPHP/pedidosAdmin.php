<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedidos</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Asegúrate de incluir la versión correcta de FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="bg-gray-100 min-h-screen flex flex-col lg:flex-row">

    <!-- Notificación -->
    <div id="notification" class="hidden fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white font-semibold text-center rounded shadow-md z-50"></div>
    
    <!-- Sidebar -->
    <?php include 'sidebarADMIN.php'; ?>

    <!-- Contenido Principal -->
    <div class="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 w-full lg:w-full mx-auto">
        
        <!-- Encabezado -->
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
            <div>
                <h1 class="text-2xl font-bold">Pedidos</h1>
                <nav class="text-gray-500 text-sm">
                    <span>Pedidos</span> &gt; <span>Ver Pedidos</span>
                </nav>
            </div>
        </div>

        <!-- Contenedor de Pedidos -->
        <div id="pedidosContainer">
            <!-- Los pedidos se cargarán aquí mediante JavaScript -->
        </div>

    </div>

    <!-- Modal para cambiar estado del pedido -->
<div id="changeOrderStatusModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
    <div class="bg-white rounded-lg w-80 p-6 relative">
        <button id="closeChangeOrderStatusModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
        </button>
        <h2 class="text-xl font-bold mb-4">Cambiar Estado del Pedido</h2>
        <div>
            <label for="orderStatusSelect" class="block mb-2">Seleccione el nuevo estado:</label>
            <select id="orderStatusSelect" class="w-full p-2 border rounded">
                <!-- Opciones se agregarán dinámicamente -->
            </select>
        </div>
        <div class="mt-4 flex justify-end">
            <button id="confirmOrderStatusButton" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Actualizar</button>
        </div>
    </div>
</div>

    <!-- Modal de Detalles del Pedido -->
    <div id="orderDetailsModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
        <div class="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-2/3 p-6 relative overflow-y-auto max-h-screen">
            <button id="closeOrderDetailsModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="text-xl font-bold mb-4">Detalles del Pedido</h2>
            <!-- Contenido del modal -->
            <div id="orderDetailsContent">
                <!-- Los detalles del pedido se cargarán aquí -->
            </div>
        </div>
    </div>

    <!-- Modal de Información de Pago -->
    <div id="paymentInfoModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
        <div class="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative overflow-y-auto max-h-screen">
            <button id="closePaymentInfoModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="text-xl font-bold mb-4">Información de Pago</h2>
            <!-- Contenido del modal -->
            <div id="paymentInfoContent">
                <!-- Los detalles del pago se cargarán aquí -->
            </div>
        </div>
    </div>

    <!-- Modal para cambiar estado del pago -->
<div id="changePaymentStatusModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
    <div class="bg-white rounded-lg w-80 p-6 relative">
        <button id="closeChangePaymentStatusModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
        </button>
        <h2 class="text-xl font-bold mb-4">Cambiar Estado del Pago</h2>
        <div>
            <label for="paymentStatusSelect" class="block mb-2">Seleccione el nuevo estado:</label>
            <select id="paymentStatusSelect" class="w-full p-2 border rounded">
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
            </select>
        </div>
        <div class="mt-4 flex justify-end">
            <button id="confirmPaymentStatusButton" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Actualizar</button>
        </div>
    </div>
</div>

<!-- Modal para mostrar la imagen del comprobante en tamaño completo -->
<div id="imageModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 hidden z-50">
    <div class="relative">
        <button id="closeImageModal" class="absolute top-2 right-2 text-white text-3xl font-bold focus:outline-none">&times;</button>
        <img id="imageModalContent" src="" alt="Comprobante de Pago" class="max-w-full h-[90vh]">
    </div>
</div>

<div id="mapModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
    <div class="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
        <div id="map" style="height: 300px; width: 100%;"></div>
        <button onclick="closeMapModal()" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Cerrar</button>
    </div>
</div>


    <!-- Script para cargar pedidos -->
    <script type="module" src="../../js/pedidosAdmin.js"></script>
</body>
</html>
