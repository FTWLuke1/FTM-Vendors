const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; // Adjusts to the content height
}
resizeCanvas();

const dots = [];

function createDots() {
    for (let i = 0; i < 150; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateDots() {
    dots.forEach(dot => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 120 || dot.y > canvas.height) dot.speedY *= -1; // Keeps dots below the header
    });
}

function animate() {
    drawDots();
    updateDots();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);

createDots();
animate();
