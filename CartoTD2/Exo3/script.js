function onLoad() {
    var map = L.map('map').setView([43.7005665, 7.267751], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Charger et afficher les données GeoJSON
    fetch('https://france-geojson.gregoiredavid.fr/repo/departements.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data).addTo(map);
        })
        .catch(error => console.error('Erreur lors du chargement des données GeoJSON:', error));
}

window.onload = onLoad;