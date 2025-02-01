// script.js
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

const numberOfConfetti = 150; // Adjust for more/less confetti
const confetti = [];

// Initialize confetti particles
for (let i = 0; i < numberOfConfetti; i++) {
    confetti.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        radius: Math.random() * 5 + 2,
        color: getRandomColor(),
        speed: Math.random() * 3 + 1,
        rotation: Math.random() * 360
    });
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confetti.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();

        // Update position and rotation
        c.y += c.speed;
        c.rotation += 0.1;
        c.x += Math.sin(c.rotation * Math.PI / 180) * 0.5; // Subtle horizontal movement

        // Reset if it goes off-screen
        if (c.y > confettiCanvas.height) {
            c.y = -c.radius;
            c.x = Math.random() * confettiCanvas.width;
            c.speed = Math.random() * 3 + 1;
        }
    });

    requestAnimationFrame(drawConfetti);
}

// Resize canvas to fill the screen
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Call initially to set the correct size

drawConfetti(); // Start the animation