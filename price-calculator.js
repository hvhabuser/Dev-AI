const prices = {
  design: [200, 300, 500],
  size: [200, 300, 500],
  pages: [200, 500, 2000],
  hasDesign: [1000, 0],
  needsAnimations: [0, 300],
  complexJS: [0, 600],
  urgent: [0, 1000]
};

let currentValues = {
  design: 0,
  size: 0,
  pages: 0,
  hasDesign: false,
  needsAnimations: false,
  complexJS: false,
  urgent: false
};

const totalPriceElement = document.getElementById('totalPrice');
const designPriceElement = document.querySelector('.design-price');
const sizePriceElement = document.querySelector('.size-price');
const pagesPriceElement = document.querySelector('.pages-price');

function updatePrice(newTotal) {
  const currentPrice = parseInt(totalPriceElement.textContent);
  animateValue(totalPriceElement, currentPrice, newTotal, 500);
  totalPriceElement.classList.add('animate');
  setTimeout(() => totalPriceElement.classList.remove('animate'), 500);
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    let value = Math.floor(progress * range + start);
    element.textContent = value + ' ₽';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + ' ₽';
    }
  }

  window.requestAnimationFrame(step);
}

function calculateTotal() {
  return prices.design[currentValues.design] +
         prices.size[currentValues.size] +
         prices.pages[currentValues.pages] +
         (currentValues.hasDesign ? prices.hasDesign[1] : prices.hasDesign[0]) +
         (currentValues.needsAnimations ? prices.needsAnimations[1] : prices.needsAnimations[0]) +
         (currentValues.complexJS ? prices.complexJS[1] : prices.complexJS[0]) +
         (currentValues.urgent ? prices.urgent[1] : prices.urgent[0]);
}

function handleButtonGroup(groupId, type, priceElement) {
  const buttons = document.querySelectorAll(`#${groupId} .option-button`);
  buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentValues[type] = index;
      priceElement.textContent = '+' + prices[type][index] + ' ₽';
      updatePrice(calculateTotal());
    });
  });
}

handleButtonGroup('designComplexity', 'design', designPriceElement);
handleButtonGroup('pageSize', 'size', sizePriceElement);
handleButtonGroup('pagesCount', 'pages', pagesPriceElement);

document.querySelectorAll('.toggle-item').forEach(item => {
  const checkbox = item.querySelector('input[type="checkbox"]');

  item.addEventListener('click', function(e) {
    if (e.target.classList.contains('slider') || e.target.tagName === 'INPUT') return;
    checkbox.checked = !checkbox.checked;
    currentValues[checkbox.id] = checkbox.checked;
    updatePrice(calculateTotal());
    this.classList.add('animate');
    setTimeout(() => this.classList.remove('animate'), 300);
  });

  checkbox.addEventListener('change', function() {
    currentValues[this.id] = this.checked;
    updatePrice(calculateTotal());
    item.classList.add('animate');
    setTimeout(() => item.classList.remove('animate'), 300);
  });
});

function syncStateOnLoad() {
  document.querySelectorAll('.toggle-item input[type="checkbox"]').forEach(checkbox => {
    currentValues[checkbox.id] = checkbox.checked;
  });
  updatePrice(calculateTotal());
}

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenuOverlay.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenuOverlay.addEventListener('click', (e) => {
  if (e.target === mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

function createGlowElements() {
  const glowContainer = document.getElementById('glow-elements');
  for (let i = 0; i < 5; i++) {
    const glow = document.createElement('div');
    glow.className = 'glow-element';
    glow.style.width = `${Math.random() * 300 + 100}px`;
    glow.style.height = glow.style.width;
    glow.style.background = `radial-gradient(circle, var(--accent), transparent)`;
    glow.style.left = `${Math.random() * 100}%`;
    glow.style.top = `${Math.random() * 100}%`;
    glow.style.animationDelay = `${Math.random() * 5}s`;
    glowContainer.appendChild(glow);
  }
}

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particlesContainer.appendChild(particle);
  }
}

createGlowElements();
createParticles();
syncStateOnLoad();