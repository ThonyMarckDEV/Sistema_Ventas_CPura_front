// agregarDireccion.js

import API_BASE_URL from './urlHelper.js';

// Definir initMap como una función global para que Google Maps la reconozca
window.initMap = function() {
    let map, marker;
    const initialPosition = { lat: -12.0464, lng: -77.0428 }; // Posición predeterminada (Lima, Perú)

    // Crear el mapa en la posición inicial
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialPosition,
        zoom: 13,
    });

    // Crear un marcador en la posición inicial
    marker = new google.maps.Marker({
        position: initialPosition,
        map: map,
        draggable: true, // Permitir mover el marcador
    });

    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Centrar el mapa en la ubicación del usuario y mover el marcador
                map.setCenter(userPosition);
                marker.setPosition(userPosition);

                // Actualizar los campos de latitud y longitud en el formulario
                document.getElementById('latitud').value = userPosition.lat;
                document.getElementById('longitud').value = userPosition.lng;
            },
            () => {
                alert("No se pudo obtener la ubicación. Se usará la posición predeterminada.");
            }
        );
    } else {
        alert("Geolocalización no soportada por el navegador.");
    }

    // Obtener coordenadas al mover el marcador manualmente
    marker.addListener('dragend', function () {
        const position = marker.getPosition();
        document.getElementById('latitud').value = position.lat();
        document.getElementById('longitud').value = position.lng();
    });

    // Obtener coordenadas al hacer clic en el mapa
    map.addListener('click', function (event) {
        marker.setPosition(event.latLng);
        document.getElementById('latitud').value = event.latLng.lat();
        document.getElementById('longitud').value = event.latLng.lng();
    });
}

// Enviar los datos del formulario al servidor
document.getElementById('direccionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('latitud', document.getElementById('latitud').value);
    formData.set('longitud', document.getElementById('longitud').value);

    const token = localStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/api/agregarDireccion`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        alert('Dirección agregada con éxito');
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});
