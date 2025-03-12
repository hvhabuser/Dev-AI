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

    function typeWriter(element, text, gradientElement, gradientText, speed, callback) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          
          // После "Dev" начинаем печатать "AI" с градиентом
          if (gradientElement && gradientText) {
            let j = 0;
            const gradientTimer = setInterval(() => {
              if (j < gradientText.length) {
                gradientElement.textContent += gradientText.charAt(j);
                j++;
              } else {
                clearInterval(gradientTimer);
                if (callback) callback();
              }
            }, speed * 1.5);
          } else {
            if (callback) callback();
          }
        }
      }, speed);
    }
    
    // Проверка загрузки всех ресурсов
    function checkResourcesLoaded() {
      return new Promise((resolve) => {
        // Проверяем загрузку шрифтов
        document.fonts.ready.then(() => {
          // Проверяем загрузку всех изображений и других ресурсов
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', resolve);
          }
        });
      });
    }
    
    // Функция для скрытия загрузочного экрана
    function hideLoadingScreen() {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.style.opacity = '0';
      
      // Удаляем класс loading с body и удаляем загрузочный экран после завершения анимации
      setTimeout(() => {
        document.body.classList.remove('loading');
        loadingScreen.remove();
        
        // Запускаем инициализацию основных анимаций сайта
        createGlowElements();
        createParticles();
      }, 800);
    }
    
    // Инициализация при загрузке DOM
    document.addEventListener('DOMContentLoaded', () => {
      const loadingText = document.getElementById('loading-text');
      const loadingGradient = document.getElementById('loading-gradient');
      
      // Запускаем печатающийся эффект
      loadingText.textContent = '';
      typeWriter(loadingText, 'Dev ', loadingGradient, 'AI', 150, () => {
        // После завершения печати проверяем загрузку всех ресурсов
        checkResourcesLoaded().then(() => {
          // Короткая пауза после завершения анимации печати
          setTimeout(hideLoadingScreen, 600);
        });
      });
    });
    document.addEventListener('DOMContentLoaded', function() {
      const menuToggle = document.querySelector('.menu-toggle'); // Кнопка открытия меню
      const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
      const mobileMenu = document.querySelector('.mobile-menu');
    
      // Функция открытия/закрытия меню
      function toggleMenu() {
        mobileMenuOverlay.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      }
    
      // Клик по кнопке открытия/закрытия меню
      menuToggle.addEventListener('click', toggleMenu);
    
      // Закрытие меню при клике вне его (на оверлей)
      mobileMenuOverlay.addEventListener('click', function(event) {
        if (event.target === mobileMenuOverlay) {
          toggleMenu();
        }
      });
    
      // Закрытие меню при клике на ссылку
      const menuLinks = document.querySelectorAll('.mobile-menu-content a');
      menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
      });
    });