document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Анимация появления элементов при скролле (Fade Up)
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Если это прогресс-бар, запускаем его заполнение
                const progressFills = entry.target.querySelectorAll('.progress-fill');
                progressFills.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });

                // Если это круговой прогресс
                const circleFill = entry.target.querySelector('.circle-fill');
                if (circleFill) {
                    circleFill.style.strokeDashoffset = circleFill.getAttribute('data-offset');
                }

                // Если это счетчик цифр
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 секунды
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    // Убираем класс, чтобы счетчик не срабатывал дважды
                    counter.classList.remove('counter'); 
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 2. Эффект шапки при скролле
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(31, 31, 31, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(31, 31, 31, 0.85)';
            header.style.boxShadow = 'none';
        }
    });
});