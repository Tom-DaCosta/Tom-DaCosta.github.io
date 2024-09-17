const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const info = document.getElementById('info');
let drawing = false;

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