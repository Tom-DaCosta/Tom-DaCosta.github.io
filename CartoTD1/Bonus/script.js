const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const info = document.getElementById('info');
const startStopButton = document.getElementById('startStopButton');
let drawing = false;
let tracking = false;
let watchId;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    drawing = true;
    const touch = e.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
    info.textContent = `Event: touchstart, Position: (${x}, ${y})`;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!drawing) return;
    const touch = e.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    ctx.lineTo(x, y);
    ctx.stroke();
    info.textContent = `Event: touchmove, Position: (${x}, ${y})`;
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    drawing = false;
    info.textContent = 'Event: touchend';
});

canvas.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    drawing = false;
    info.textContent = 'Event: touchcancel';
});

startStopButton.addEventListener('click', () => {
    if (tracking) {
        stopTracking();
    } else {
        startTracking();
    }
});

function startTracking() {
    tracking = true;
    startStopButton.textContent = 'Stop Tracking';

    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            info.textContent = `Geolocation: (${latitude}, ${longitude})`;
        });
    }

    window.addEventListener('devicemotion', handleDeviceMotion);
}

function stopTracking() {
    tracking = false;
    startStopButton.textContent = 'Start Tracking';

    if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
    }

    window.removeEventListener('devicemotion', handleDeviceMotion);
}

function handleDeviceMotion(event) {
    const { acceleration } = event;
    if (acceleration) {
        const x = acceleration.x * 10;
        const y = acceleration.y * 10;
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, 5, 0, 2 * Math.PI);
        ctx.fill();
        info.textContent = `Device Motion: (${x.toFixed(2)}, ${y.toFixed(2)})`;
    }
}