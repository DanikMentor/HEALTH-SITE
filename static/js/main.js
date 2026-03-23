document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Navbar Effect (Glassmorphism на скролле)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Анимация появления элементов при скролле (Fade-up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 3. Анимация счетчиков (Статистика)
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const updateCount = () => {
                    const targetNum = +target.getAttribute('data-target');
                    const count = +target.innerText;
                    const inc = targetNum / 100; // Скорость анимации

                    if (count < targetNum) {
                        target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        target.innerText = targetNum;
                    }
                };
                updateCount();
                obs.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 4. Parallax Effect для Hero секции по движению мыши
    const hero = document.getElementById('hero');
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;

            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-speed');
                el.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
            });
        });
    }

    // 5. Анимация печатающегося текста в демо AI Чата
    const typingElement = document.getElementById('typing-text');
    if (typingElement && typeof aiResponseText !== 'undefined') {
        let i = 0;
        const chatObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                setTimeout(typeWriter, 500); // Задержка перед началом
                chatObserver.disconnect();
            }
        });
        chatObserver.observe(document.querySelector('.ai-demo'));

        function typeWriter() {
            if (i < aiResponseText.length) {
                typingElement.innerHTML += aiResponseText.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Скорость печати
            } else {
                document.querySelector('.cursor').style.display = 'none'; // Убираем курсор в конце
            }
        }
    }
});