function onLoad() {
    var map = L.map('map').setView([25, -71], 5);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("Vous êtes à " + radius + " metres de ce point").openPopup();

        L.circle(e.latlng, radius).addTo(map);

        var marseille = [43.3, 5.4];
        var polygon1 = L.polygon([
            e.latlng,
            marseille
        ]).addTo(map);

        // Calculer la distance entre Marseille et la position actuelle
        var distance = calculateDistance(e.latlng.lat, e.latlng.lng, marseille[0], marseille[1]);
        L.popup()
            .setLatLng(e.latlng)
            .setContent("Distance de Marseille: " + distance.toFixed(2) + " km")
            .openOn(map);
    }

    map.on('locationfound', onLocationFound);

    // Ajouter plusieurs marqueurs
    var markers = [
        { lat: 25.789106, lng: -80.226529, popup: "Miami" },
        { lat: 18.4663188, lng: -66.1057427, popup: "San Juan" },
        { lat: 32.294887, lng: -64.781380, popup: "Hamilton" },
        { lat: 43.3, lng: 5.4, popup: "Marseille" },
        { lat: 43.7, lng: 7.25, popup: "Nice" }
    ];

    var polygon2 = L.polygon([
        [25.789106, -80.226529],
        [18.4663188, -66.1057427],
        [32.294887, -64.781380]
    ]).addTo(map);

    polygon2.bindPopup("Triangle des Bermudes");

    markers.forEach(function (marker) {
        L.marker([marker.lat, marker.lng]).addTo(map)
            .bindPopup(marker.popup);
    });

    // Ajouter un segment entre Marseille et Nice
    var marseille = [43.3, 5.4];
    var nice = [43.7, 7.25];
    var segment = L.polyline([marseille, nice], { color: 'blue' }).addTo(map);
}

// Fonction pour calculer la distance du grand cercle
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Rayon de la Terre en km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Convertir les degrés en radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

window.onload = onLoad;