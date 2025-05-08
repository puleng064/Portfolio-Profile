// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Handle form submission
const form = document.getElementById('contactForm');
const messageDiv = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg = document.getElementById('message').value.trim();

        if (!name || !email || !msg) {
            showMessage('Please fill out all fields.', 'error');
            return;
        }

        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailPattern.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate AJAX request
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message: msg })
        })
        .then(response => response.json())
        .then(data => {
            showMessage('Your message has been sent successfully!', 'success');
            form.reset();
        })
        .catch(error => {
            showMessage('Failed to send message. Please try again later.', 'error');
        });
    });
}

function showMessage(msg, type) {
    messageDiv.style.display = 'block';
    messageDiv.textContent = msg;
    messageDiv.className = '';
    messageDiv.classList.add(type);
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 4000);
}
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1; // Random radius
    this.speedX = Math.random() * 3 - 1.5; // Random x speed
    this.speedY = Math.random() * 3 - 1.5; // Random y speed
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.speedX *= -1;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.speedY *= -1;
    }
}

Particle.prototype.draw = function() {
    ctx.fillStyle = 'rgba(255, 20, 100, 1)'; // Change color if needed
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
}

function init() {
    for (let i = 0; i < 400; i++) { // Adjust number of particles
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();
<script>
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const mouse = {
    x: null,
    y: null,
    radius: 100
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Particle(x, y, directionX, directionY, size, colorClass) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.colorClass = colorClass;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.colorClass;
        ctx.fill();
    };

    this.update = function () {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    };
}

function connect() {
    let opacity;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                opacity = 1 - distance / 120;
                ctx.strokeStyle = `rgba(255, 105, 180, ${opacity})`; // Pink lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 8000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = (Math.random()
