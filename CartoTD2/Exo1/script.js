function onLoad() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    map.locate({ setView: true, maxZoom: 16 });
    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("Vous êtes à " + radius + " metre de ce point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
        map.on('locationfound', onLocationFound);
    }
}

window.onload = onLoad;