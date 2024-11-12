
import API_BASE_URL from './urlHelper.js';

// Obtener el token JWT desde localStorage
const token = localStorage.getItem('jwt');

// Función para decodificar el JWT y obtener el payload
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al decodificar el JWT:", error);
        return null;
    }
}

// Obtener el idUsuario del token JWT
const decodedToken = parseJwt(token);
const idUsuario = decodedToken ? decodedToken.idUsuario : null;

// Función para cargar direcciones del usuario
async function loadDirecciones() {
    if (!idUsuario) {
        console.error("idUsuario no encontrado en el token");
        return;
    }

    const response = await fetch(`${API_BASE_URL}/api/listarDireccion/${idUsuario}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Error al cargar las direcciones');
        return;
    }

    const direcciones = await response.json();
    const tableBody = document.getElementById('direccionesTableBody');
    tableBody.innerHTML = '';

    direcciones.forEach(direccion => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${direccion.region}</td>
            <td class="px-4 py-2">${direccion.provincia}</td>
            <td class="px-4 py-2">${direccion.direccion}</td>
            <td class="px-4 py-2">${direccion.estado}</td>
            <td class="px-4 py-2">
                <button onclick="verMapa(${direccion.latitud}, ${direccion.longitud})" class="text-blue-500 mr-2">Ver</button>
                <button onclick="setUsando(${direccion.idDireccion})" class="text-green-500 mr-2">Usar</button>
                <button onclick="eliminarDireccion(${direccion.idDireccion})" class="text-red-500">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para ver la dirección en el mapa
function verMapa(latitud, longitud) {
    document.getElementById('mapModal').classList.remove('hidden');
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitud, lng: longitud },
        zoom: 15,
    });
    new google.maps.Marker({
        position: { lat: latitud, lng: longitud },
        map: map,
    });
}

// Función para cerrar el modal del mapa
function closeMapModal() {
    document.getElementById('mapModal').classList.add('hidden');
}

// Función para establecer una dirección como "usando"
async function setUsando(idDireccion) {
    await fetch(`${API_BASE_URL}/api/setDireccionUsando/${idDireccion}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    loadDirecciones();
}

// Función para eliminar una dirección
async function eliminarDireccion(idDireccion) {
    await fetch(`${API_BASE_URL}/api/eliminarDireccion/${idDireccion}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    loadDirecciones();
}

// Cargar las direcciones al cargar la página
loadDirecciones();

// Colocar todas las funciones en el contexto global
window.eliminarDireccion = eliminarDireccion;
window.closeMapModal = closeMapModal;
window.verMapa = verMapa;
window.setUsando = setUsando;