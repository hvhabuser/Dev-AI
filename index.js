    // Создание светящихся элементов
    function createGlowElements() {
      const container = document.getElementById('glow-elements');
      const glowConfigs = [
        { width: 300, height: 300, background: 'var(--gradient-start)', top: -50, left: '15%', delay: 0 },
        { width: 400, height: 400, background: 'var(--gradient-end)', bottom: -100, right: '10%', delay: -5 },
        { width: 250, height: 250, background: '#8250df', top: '40%', left: '5%', delay: -8 }
      ];
      
      glowConfigs.forEach(config => {
        const glowElement = document.createElement('div');
        glowElement.className = 'glow-element';
        
        Object.entries(config).forEach(([key, value]) => {
          if (key === 'delay') {
            glowElement.style.animationDelay = `${value}s`;
          } else if (key === 'width' || key === 'height') {
            glowElement.style[key] = `${value}px`;
          } else {
            glowElement.style[key] = value;
          }
        });
        
        container.appendChild(glowElement);
      });
    }
    
    // Создание частиц
    function createParticles() {
      const container = document.getElementById('particles');
      const numberOfParticles = 8;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные позиции
        particle.style.top = `${Math.random() * 90 + 5}%`;
        particle.style.left = `${Math.random() * 90 + 5}%`;
        
        // Случайная задержка анимации
        particle.style.animationDuration = `${Math.random() * 5 + 4}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    }
    
    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', () => {
      createGlowElements();
      createParticles();
    });
