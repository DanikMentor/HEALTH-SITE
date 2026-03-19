document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ЭФФЕКТ ХЕДЕРА ПРИ СКРОЛЛЕ ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. ПОЯВЛЕНИЕ БЛОКОВ ПРИ СКРОЛЛЕ (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Запуск печатной машинки, если это текст отзыва
                const typewriterEl = entry.target.querySelector('.typewriter-text');
                if (typewriterEl && !typewriterEl.classList.contains('typed')) {
                    typeText(typewriterEl, typewriterEl.getAttribute('data-text'));
                    typewriterEl.classList.add('typed');
                }
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // --- 3. ЭФФЕКТ 3D-НАКЛОНА (TILT) ДЛЯ КАРТОЧЕК ШАГОВ ---
    // (Это то, что ты спрашивал - вставляем прямо сюда)
    const stepCards = document.querySelectorAll('.step-card');

    stepCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // координата X внутри карточки
            const y = e.clientY - rect.top;  // координата Y внутри карточки
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Вычисляем угол наклона (чем дальше от центра, тем больше наклон)
            const rotateX = (y - centerY) / 10; 
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        // Возвращаем в исходное положение, когда мышка уходит
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
    function typeText(element, text) {
        element.innerHTML = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 40);
            }
        }
        typeWriter();
    }
});

document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Останавливаем перезагрузку

    // Получаем данные из полей
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (email && password) {
        // Имитируем сохранение пользователя
        const userData = {
            name: "Алексей Иванов",
            email: email,
            avatar: "https://i.pravatar.cc/150?img=32"
        };

        localStorage.setItem('user', JSON.stringify(userData)); // Сохраняем в память браузера
        
        // Перенаправляем на главную
        window.location.href = 'index.html';
    } else {
        alert("Пожалуйста, заполните все поля!");
    }
});