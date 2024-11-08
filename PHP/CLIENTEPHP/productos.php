<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="bg-gray-100 min-h-screen flex flex-col lg:flex-row">

    <!-- Sidebar -->
    <?php include 'sidebarCLIENTE.php'; ?>

    <!-- Contenido Principal -->
    <div class="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 w-full lg:w-full mx-auto">
        
        <!-- Encabezado -->
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
            <div>
                <h1 class="text-2xl font-bold">Catálogo</h1>
                <nav class="text-gray-500 text-sm">
                    <span>Productos</span> &gt; <span>Listado</span>
                </nav>
            </div>
        </div>

        <!-- Tabla de Productos -->
        <div class="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <!-- Barra de búsqueda y filtros -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                <input type="text" id="searchInput" onkeyup="buscarProducto()" placeholder="Buscar" class="w-full md:w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button class="flex items-center space-x-1 text-gray-500 px-4 py-2 border border-gray-300 rounded-lg">
                    <i class="fas fa-filter"></i> <span>Filtros</span>
                </button>
            </div>
            
            <!-- Tabla responsive -->
            <div class="overflow-x-auto">
                <table id="productosTable" class="w-full min-w-full border-collapse">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="p-4 text-left text-sm font-semibold text-gray-700">Nombre</th>
                            <th class="p-4 text-left text-sm font-semibold text-gray-700">Descripción</th>
                            <th class="p-4 text-left text-sm font-semibold text-gray-700">Categoría</th>
                            <th class="p-4 text-left text-sm font-semibold text-gray-700">Precio</th>
                            <th class="p-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                            <th class="p-4 text-left text-sm font-semibold text-gray-700">Imagen</th>
                            <th class="p-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm">
                        <!-- Los datos de los productos se agregarán aquí dinámicamente -->
                    </tbody>
                </table>
            </div>

            <!-- Paginación -->
            <div class="flex flex-col md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0">
                <select class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Script para cargar productos -->
    <script type="module" src="../../js/listarProductosCliente.js"></script>
</body>
</html>
