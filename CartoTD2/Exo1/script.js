function onLoad() {
    var map = L.map('map').setView([43.7005665, 7.267751], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Localiser l'utilisateur
    map.locate({ setView: true, maxZoom: 16 });

    // Ajouter un marqueur à la position de l'utilisateur
    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("Vous êtes à " + radius + " metres de ce point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    // Gérer les erreurs de localisation
    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationerror', onLocationError);

    // Ajouter plusieurs marqueurs
    var markers = [
        { lat: 43.7005665, lng: 7.267751, popup: "Centre Nice" }
    ];

    markers.forEach(function (marker) {
        L.marker([marker.lat, marker.lng]).addTo(map)
            .bindPopup(marker.popup);
    });
}

window.onload = onLoad;