document.addEventListener('DOMContentLoaded', function () {
  let gamesButton = document.querySelector('.tablinks.games-icon');
  openTab(new Event('click'), 'Games', gamesButton);
  showSlides(slideIndex);
  setTimeout(type, 2000);
});

function triggerHapticFeedback() {
  if (window.Telegram?.WebApp?.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  }
}

function openTab(evt, tabName, button) {
  triggerHapticFeedback();
  const tabcontent = document.getElementsByClassName('tabcontent');
  const tablinks = document.getElementsByClassName('tablinks');
  const miniModal = document.getElementById('miniModal');
  const aboutGif = document.getElementById('aboutGif');

  // Hide all tab content and remove 'active' class
  Array.from(tabcontent).forEach(tc => {
    tc.style.display = 'none';
    tc.classList.remove('active');
  });

  // Remove 'active' class from all buttons
  Array.from(tablinks).forEach(tl => {
    tl.classList.remove('active');
  });

  // Show current tab and add 'active' class
  document.getElementById(tabName).style.display = 'flex';
  document.getElementById(tabName).classList.add('active');
  button.classList.add('active');

  // Scroll page
  if (tabName === 'Games') {
    window.scrollTo({ top: 45, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle 'About' tab
  if (tabName === 'About') {
    const newAboutGif = aboutGif.cloneNode(true);
    aboutGif.parentNode.replaceChild(newAboutGif, aboutGif);
    aboutAudio.play();
  } else {
    aboutAudio.pause();
    aboutAudio.currentTime = 0;
  }

  // Handle 'Contact' tab
  if (tabName === 'Contact') {
    miniModal.style.display = 'none';
  }
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1; // Размер звездочек
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
      particlesArray.push(new Particle());
    }
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();
animate();