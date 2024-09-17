function onLoad() {
    console.log("Page loaded");
    navigator.geolocation.getCurrentPosition(afficherPosition, afficherPrecision, afficherVitesse, afficherDate);
    navigator.geolocation.watchPosition(afficherPosition, afficherPrecision, afficherVitesse, afficherDate);
    afficherDate(Date.now());
}

function afficherPosition(position) {
    const { longitude, latitude, altitude } = position.coords;
    const long = document.querySelector("#long");
    const lat = document.querySelector("#lat");
    const alt = document.querySelector("#alt");
    long.textContent = `Longitude: ${longitude}`;
    lat.textContent = `Latitude: ${latitude}`;
    alt.textContent = `Altitude: ${altitude}`;
    console.log(`Position : Longitude: ${longitude}, Latitude: ${latitude}, Altitude: ${altitude}`);
}

function afficherPrecision(position) {
    const precision = position.coords.accuracy;
    console.log(`Précision de mesure : ${precision} mètres`);
}

function afficherVitesse(position) {
    const vitesse = position.coords.speed;
    console.log(`Vitesse : ${vitesse} m/s`);
}

function afficherDate(timestamp) {
    const date = new Date(timestamp);
    console.log(`Date : ${date}`);
}