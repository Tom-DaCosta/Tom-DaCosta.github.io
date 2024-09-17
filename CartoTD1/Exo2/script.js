function onLoad() {
    console.log("Page loaded");

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', afficherOrientation);
    } else {
        console.log("DeviceOrientationEvent is not supported");
    }

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', afficherMouvement);
    } else {
        console.log("DeviceMotionEvent is not supported");
    }
}

function afficherOrientation(event) {
    document.getElementById('alpha').textContent = event.alpha.toFixed(2);
    document.getElementById('beta').textContent = event.beta.toFixed(2);
    document.getElementById('gamma').textContent = event.gamma.toFixed(2);
}

function afficherMouvement(event) {
    const accel = event.acceleration;
    const rotRate = event.rotationRate;

    document.getElementById('accelX').textContent = accel.x.toFixed(2);
    document.getElementById('accelY').textContent = accel.y.toFixed(2);
    document.getElementById('accelZ').textContent = accel.z.toFixed(2);

    document.getElementById('rotAlpha').textContent = rotRate.alpha.toFixed(2);
    document.getElementById('rotBeta').textContent = rotRate.beta.toFixed(2);
    document.getElementById('rotGamma').textContent = rotRate.gamma.toFixed(2);
}

window.onload = onLoad;