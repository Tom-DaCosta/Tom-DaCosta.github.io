function onLoad() {
    console.log("Page loaded");
    navigator.geolocation.getCurrentPosition(afficherPositionCurrent, afficherErreur);
    navigator.geolocation.watchPosition(afficherPositionWatch, afficherErreur);
}

function afficherPositionCurrent(position) {
    afficherPosition(position, "current");
}

function afficherPositionWatch(position) {
    afficherPosition(position, "watch");
}

function afficherPosition(position, type) {
    const { longitude, latitude, altitude } = position.coords;
    const long = document.querySelector(`#long-${type}`);
    const lat = document.querySelector(`#lat-${type}`);
    const alt = document.querySelector(`#alt-${type}`);
    long.textContent = `Longitude: ${longitude}`;
    lat.textContent = `Latitude: ${latitude}`;
    alt.textContent = altitude !== null ? `Altitude: ${altitude}` : "Altitude non disponible";
    console.log(`Position (${type}) : Longitude: ${longitude}, Latitude: ${latitude}, Altitude: ${altitude !== null ? altitude : "non disponible"}`);

    afficherPrecision(position, type);
    afficherVitesse(position, type);
    afficherDate(Date.now(), type);
}

function afficherPrecision(position, type) {
    const precision = position.coords.accuracy;
    const prec = document.querySelector(`#prec-${type}`);
    prec.textContent = `Précision de mesure : ${precision} mètres`;
    console.log(`Précision de mesure (${type}) : ${precision} mètres`);
}

function afficherVitesse(position, type) {
    const vitesse = position.coords.speed;
    const vit = document.querySelector(`#vit-${type}`);
    vit.textContent = `Vitesse : ${vitesse} m/s`;
    console.log(`Vitesse (${type}) : ${vitesse} m/s`);
}

function afficherDate(timestamp, type) {
    const date = new Date(timestamp);
    const datehtml = document.querySelector(`#date-${type}`);
    datehtml.textContent = `Date : ${date}`;
    console.log(`Date (${type}) : ${date}`);
}

function afficherErreur(error) {
    console.error(`Erreur de géolocalisation : ${error.message}`);
}