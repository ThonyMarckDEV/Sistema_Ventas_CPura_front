import API_BASE_URL from './urlHelper.js';

// Obtener el token JWT desde localStorage
const token = localStorage.getItem('jwt');

// Decodificar el JWT para obtener el idUsuario
let idUsuario = null;

function decodeJWT(token) {
    try {
        const payloadBase64 = token.split('.')[1];
        const payload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(payload);
    } catch (error) {
        console.error('Error al decodificar el JWT:', error);
        return null;
    }
}

if (token) {
    const decoded = decodeJWT(token);
    if (decoded && decoded.idUsuario) {
        idUsuario = decoded.idUsuario;
    } else {
        showNotification('Token inválido o no contiene idUsuario.', 'bg-red-500');
    }
} else {
    showNotification('No se encontró el token de autenticación.', 'bg-red-500');
}

// Elementos del DOM
const pedidosTableBody = document.getElementById('pedidosTableBody');
const paymentModal = document.getElementById('paymentModal');
const closeModalButton = document.getElementById('closeModal');
const cancelPaymentButton = document.getElementById('cancelPayment');
const proceedToPaymentButton = document.getElementById('proceedToPayment');
const confirmPaymentTypeButton = document.getElementById('confirmPaymentType');
const closePaymentTypeModalButton = document.getElementById('closePaymentTypeModal');
const modalPedidoId = document.getElementById('modalPedidoId');
const modalTotal = document.getElementById('modalTotal');
const notification = document.getElementById('notification');
const paymentTypeModal = document.getElementById('paymentTypeModal');
const paymentMethodSelect = document.getElementById('paymentMethod');
const paymentDetails = document.getElementById('paymentDetails');
const qrImage = document.getElementById('qrImage');
const comprobanteFileInput = document.getElementById('comprobanteFile');

// Variable para almacenar el pedido seleccionado
let pedidoSeleccionado = null;

// Función para mostrar notificaciones
function showNotification(message, bgColor) {
    if (!notification) return;
    notification.textContent = message;
    notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white font-semibold text-center ${bgColor} rounded shadow-md`;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 5000);
}

// Función para obtener los pedidos desde la API
async function fetchPedidos() {
    if (!idUsuario) {
        showNotification('Error: idUsuario no disponible.', 'bg-red-500');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/pedidos/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (data.success) {
            renderPedidos(data.pedidos);
        } else {
            showNotification(data.message, 'bg-red-500');
        }
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        showNotification('Error al obtener los pedidos. Intenta nuevamente.', 'bg-red-500');
    }
}

function renderPedidos(pedidos) {
    pedidosTableBody.innerHTML = '';

    pedidos.forEach((pedido) => {
        const tr = document.createElement('tr');

        const tdIdPedido = document.createElement('td');
        tdIdPedido.textContent = pedido.idPedido;
        tdIdPedido.className = 'py-3 px-6 border-b';
        tr.appendChild(tdIdPedido);

        const tdTotal = document.createElement('td');
        tdTotal.textContent = `S/${Number(pedido.total).toFixed(2)}`;
        tdTotal.className = 'py-3 px-6 border-b';
        tr.appendChild(tdTotal);

        const tdEstado = document.createElement('td');
        tdEstado.textContent = capitalizeFirstLetter(pedido.estado);
        tdEstado.className = 'py-3 px-6 border-b';
        tr.appendChild(tdEstado);

        const tdAccion = document.createElement('td');

        if (pedido.estado === 'completado') {
            tdAccion.innerHTML = '<span class="text-green-500 font-semibold">Completado</span>';
        } else if (['pendiente de aprobacion', 'aprobando', 'en preparacion', 'enviado'].includes(pedido.estado)) {
            const botonEstado = document.createElement('button');
            botonEstado.textContent = 'Ver Estado';
            botonEstado.className = 'px-4 py-2 bg-gray-500 text-white rounded';
            botonEstado.addEventListener('click', () => abrirEstadoModal(pedido.estado));
            tdAccion.appendChild(botonEstado);
        } else {
            const botonDetalles = document.createElement('button');
            botonDetalles.textContent = 'Ver Detalles';
            botonDetalles.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600';
            botonDetalles.addEventListener('click', () => abrirModal(pedido));
            tdAccion.appendChild(botonDetalles);
        }

        tdAccion.className = 'py-3 px-6 border-b';
        tr.appendChild(tdAccion);

        pedidosTableBody.appendChild(tr);
    });
}

// Función para abrir el modal de estado con línea de tiempo
function abrirEstadoModal(estadoActual) {
    const estados = ['aprobando', 'en preparacion', 'enviado', 'completado'];
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    estados.forEach((estado, index) => {
        const estadoElement = document.createElement('div');
        estadoElement.className = 'flex flex-col items-center';
        const isActive = estados.indexOf(estadoActual) >= index;
        estadoElement.innerHTML = `
            <div class="w-8 h-8 flex items-center justify-center rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}">
                <span class="text-white font-bold">${index + 1}</span>
            </div>
            <p class="mt-2 text-sm ${isActive ? 'text-green-600 font-semibold' : 'text-gray-600'}">${capitalizeFirstLetter(estado)}</p>
            ${index < estados.length - 1 ? '<div class="h-8 border-l-2 border-gray-300"></div>' : ''}
        `;
        timeline.appendChild(estadoElement);
    });

    document.getElementById('estadoModal').classList.remove('hidden');
}

// Cerrar el modal de estado
function cerrarEstadoModal() {
    document.getElementById('estadoModal').classList.add('hidden');
}

// Función para capitalizar la primera letra de una palabra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Mostrar el modal de detalles del pedido
function abrirModal(pedido) {
    pedidoSeleccionado = pedido;
    modalPedidoId.textContent = pedido.idPedido;
    modalTotal.textContent = `S/${Number(pedido.total).toFixed(2)}`;
    renderDetalles(pedido.detalles);
    paymentModal.classList.remove('hidden');
}

// Mostrar el modal de tipo de pago al hacer clic en "Proceder al Pago"
if (proceedToPaymentButton) {
    proceedToPaymentButton.addEventListener('click', () => {
        paymentModal.classList.add('hidden');
        paymentTypeModal.classList.remove('hidden');
    });
}

// Controlar la selección de tipo de pago
if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', function() {
        if (this.value === 'yape' || this.value === 'plin') {
            paymentDetails.classList.remove('hidden');
            qrImage.src = this.value === 'yape' ? '../../img/yapeqr.jpg' : '../../img/plinqr.png';
        } else {
            paymentDetails.classList.add('hidden');
        }
    });
}

// Validar archivo adjunto
function validarArchivoAdjunto() {
    const selectedMethod = paymentMethodSelect.value;
    const file = comprobanteFileInput.files[0];

    if ((selectedMethod === 'yape' || selectedMethod === 'plin') && !file) {
        alert('Por favor, adjunte un archivo de comprobante para proceder.');
        return false;
    }
    return true;
}

// Confirmar el tipo de pago y adjuntar comprobante
if (confirmPaymentTypeButton) {
    confirmPaymentTypeButton.addEventListener('click', () => {
        if (!validarArchivoAdjunto()) {
            return; // Detener si no hay un archivo adjunto
        }

        const selectedMethod = paymentMethodSelect.value;
        if (selectedMethod === 'yape' || selectedMethod === 'plin') {
            const formData = new FormData();
            formData.append('comprobante', comprobanteFileInput.files[0]);
            formData.append('metodo_pago', selectedMethod);

            fetch(`${API_BASE_URL}/api/procesar-pago/${pedidoSeleccionado.idPedido}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            }).then(response => response.json()).then(data => {
                if (data.success) {
                    showNotification('Pago procesado exitosamente.', 'bg-green-500');
                    cerrarPaymentTypeModal();
                    fetchPedidos();
                } else {
                    showNotification(data.message || 'Error al procesar el pago.', 'bg-red-500');
                }
            });
        } else {
            showNotification('Pago en efectivo confirmado', 'bg-green-500');
            cerrarPaymentTypeModal();
        }
    });
}

// Función para cerrar el modal de tipo de pago
function cerrarPaymentTypeModal() {
    paymentTypeModal.classList.add('hidden');
}

// Evento para cerrar el modal al hacer clic en el botón "X"
if (closePaymentTypeModalButton) {
    closePaymentTypeModalButton.addEventListener('click', cerrarPaymentTypeModal);
}

// También permite cerrar el modal con la tecla "Escape"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        cerrarPaymentTypeModal();
    }
});

// Función para renderizar los detalles del pedido en el modal
function renderDetalles(detalles) {
    const modalDetalles = document.getElementById('modalDetalles');
    modalDetalles.innerHTML = '';

    detalles.forEach(detalle => {
        const tr = document.createElement('tr');
        
        const tdIdDetalle = document.createElement('td');
        tdIdDetalle.textContent = detalle.idDetallePedido;
        tdIdDetalle.className = 'py-2 px-4 border';
        tr.appendChild(tdIdDetalle);

        const tdIdProducto = document.createElement('td');
        tdIdProducto.textContent = detalle.idProducto;
        tdIdProducto.className = 'py-2 px-4 border';
        tr.appendChild(tdIdProducto);

        const tdProducto = document.createElement('td');
        tdProducto.textContent = detalle.nombreProducto;
        tdProducto.className = 'py-2 px-4 border';
        tr.appendChild(tdProducto);

        const tdCantidad = document.createElement('td');
        tdCantidad.textContent = detalle.cantidad;
        tdCantidad.className = 'py-2 px-4 border';
        tr.appendChild(tdCantidad);

        const tdPrecioUnitario = document.createElement('td');
        tdPrecioUnitario.textContent = `S/${Number(detalle.precioUnitario).toFixed(2)}`;
        tdPrecioUnitario.className = 'py-2 px-4 border';
        tr.appendChild(tdPrecioUnitario);

        const tdSubtotal = document.createElement('td');
        tdSubtotal.textContent = `S/${Number(detalle.subtotal).toFixed(2)}`;
        tdSubtotal.className = 'py-2 px-4 border';
        tr.appendChild(tdSubtotal);

        modalDetalles.appendChild(tr);
    });
}

// Función para cerrar el modal de detalles
function cerrarModal() {
    if (paymentModal) paymentModal.classList.add('hidden');
    pedidoSeleccionado = null;
}

// Asignar eventos para cerrar el modal de detalles si los elementos existen
if (closeModalButton) closeModalButton.addEventListener('click', cerrarModal);
if (cancelPaymentButton) cancelPaymentButton.addEventListener('click', cerrarModal);

// Inicializar la carga de pedidos al cargar la página
document.addEventListener('DOMContentLoaded', fetchPedidos);

// Asignar eventos de cierre al botón de cierre del modal de estado
document.getElementById('closeEstadoModal').addEventListener('click', cerrarEstadoModal);
