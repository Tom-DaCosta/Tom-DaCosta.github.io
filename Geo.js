function onLoad() {
    console.log("Page loaded");
    navigator.geolocation.getCurrentPosition(afficherPosition, afficherErreur);
    navigator.geolocation.watchPosition(afficherPosition, afficherErreur);
    afficherDate(Date.now());
}

function afficherPosition(position) {
    const { longitude, latitude, altitude } = position.coords;
    const long = document.querySelector("#long");
    const lat = document.querySelector("#lat");
    const alt = document.querySelector("#alt");
    long.textContent = `Longitude: ${longitude}`;
    lat.textContent = `Latitude: ${latitude}`;
    alt.textContent = altitude !== null ? `Altitude: ${altitude}` : "Altitude non disponible";
    console.log(`Position : Longitude: ${longitude}, Latitude: ${latitude}, Altitude: ${altitude !== null ? altitude : "non disponible"}`);
    
    afficherPrecision(position);
    afficherVitesse(position);
    afficherDate(Date.now());
}

function afficherPrecision(position) {
    const precision = position.coords.accuracy;
    const prec = document.querySelector("#prec");
    prec.textContent = `Précision de mesure : ${precision} mètres`;
    console.log(`Précision de mesure : ${precision} mètres`);
}

function afficherVitesse(position) {
    const vitesse = position.coords.speed;
    const vit = document.querySelector("#vit");
    vit.textContent = `Vitesse : ${vitesse} m/s`;
    console.log(`Vitesse : ${vitesse} m/s`);
}

function afficherDate(timestamp) {
    const date = new Date(timestamp);
    const datehtml = document.querySelector("#date");
    datehtml.textContent = `Date : ${date}`;
    console.log(`Date : ${date}`);
}

function afficherErreur(error) {
    console.error(`Erreur de géolocalisation : ${error.message}`);
}