// Animated Starfield
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 250; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.05,
    opacity: Math.random()
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(240, 237, 230, ${s.opacity})`;
    ctx.fill();
    s.y += s.speed;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Earth Globe
const earthCanvas = document.getElementById('earth');
const ec = earthCanvas.getContext('2d');
earthCanvas.width = 500;
earthCanvas.height = 500;

let earthOffset = 0;

function drawEarth() {
  ec.clearRect(0, 0, 500, 500);

  ec.beginPath();
  ec.arc(250, 250, 245, 0, Math.PI * 2);
  ec.fillStyle = '#1a6fa8';
  ec.fill();

  const glow = ec.createRadialGradient(250, 250, 200, 250, 250, 245);
  glow.addColorStop(0, 'transparent');
  glow.addColorStop(1, 'rgba(100,180,255,0.3)');
  ec.beginPath();
  ec.arc(250, 250, 245, 0, Math.PI * 2);
  ec.fillStyle = glow;
  ec.fill();

  ec.save();
  ec.beginPath();
  ec.arc(250, 250, 245, 0, Math.PI * 2);
  ec.clip();

  const o = earthOffset;

  ec.beginPath();
  ec.ellipse(260 + o, 260, 45, 70, 0.1, 0, Math.PI * 2);
  ec.fillStyle = '#2d8a4e';
  ec.fill();

  ec.beginPath();
  ec.ellipse(240 + o, 180, 30, 25, -0.2, 0, Math.PI * 2);
  ec.fillStyle = '#3a9a5c';
  ec.fill();

  ec.beginPath();
  ec.ellipse(100 + o, 220, 40, 80, 0.15, 0, Math.PI * 2);
  ec.fillStyle = '#2d8a4e';
  ec.fill();

  ec.beginPath();
  ec.ellipse(370 + o, 200, 70, 50, -0.1, 0, Math.PI * 2);
  ec.fillStyle = '#3a9a5c';
  ec.fill();

  ec.beginPath();
  ec.ellipse(100 + o - 500, 220, 40, 80, 0.15, 0, Math.PI * 2);
  ec.fillStyle = '#2d8a4e';
  ec.fill();

  ec.beginPath();
  ec.ellipse(370 + o - 500, 200, 70, 50, -0.1, 0, Math.PI * 2);
  ec.fillStyle = '#3a9a5c';
  ec.fill();

  ec.beginPath();
  ec.ellipse(260 + o - 500, 260, 45, 70, 0.1, 0, Math.PI * 2);
  ec.fillStyle = '#2d8a4e';
  ec.fill();

  ec.restore();

  ec.save();
  ec.beginPath();
  ec.arc(250, 250, 245, 0, Math.PI * 2);
  ec.clip();

  ec.fillStyle = 'rgba(255,255,255,0.15)';
  ec.beginPath();
  ec.ellipse(180 + o * 0.5, 200, 60, 20, 0.3, 0, Math.PI * 2);
  ec.fill();
  ec.beginPath();
  ec.ellipse(320 + o * 0.5, 300, 50, 15, -0.2, 0, Math.PI * 2);
  ec.fill();

  ec.restore();

  const shadow = ec.createRadialGradient(320, 250, 100, 320, 250, 350);
  shadow.addColorStop(0, 'transparent');
  shadow.addColorStop(1, 'rgba(0,0,0,0.7)');
  ec.beginPath();
  ec.arc(250, 250, 245, 0, Math.PI * 2);
  ec.fillStyle = shadow;
  ec.fill();

  earthOffset += 0.4;
  if (earthOffset > 500) earthOffset = 0;

  requestAnimationFrame(drawEarth);
}

drawEarth();

// Scroll Animations
const revealElements = document.querySelectorAll(
  '.stat, .mission-right, .mission-left, .missions-header, .mission-card, .contact-left, .contact-right, .footer, .quote-inner'
);

revealElements.forEach(el => el.classList.add('hidden'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

revealElements.forEach(el => observer.observe(el));

document.querySelectorAll('.mission-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.2}s`;
});

document.querySelectorAll('.stat').forEach((stat, i) => {
  stat.style.transitionDelay = `${i * 0.15}s`;
});

// Contact Form
async function submitForm() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const status  = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.textContent = 'PLEASE FILL IN ALL REQUIRED FIELDS.';
    status.className = 'form-status error';
    return;
  }

  status.textContent = 'SENDING...';
  status.className = 'form-status';

  try {
    const res = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (res.ok) {
      status.textContent = 'MESSAGE SENT. WE WILL BE IN TOUCH.';
      status.className = 'form-status success';
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
    } else {
      throw new Error('Server error');
    }
  } catch {
    status.textContent = 'SOMETHING WENT WRONG. TRY AGAIN.';
    status.className = 'form-status error';
  }
}