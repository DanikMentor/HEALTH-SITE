document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. ПЕРЕКЛЮЧЕНИЕ СЕКЦИЙ (SPA LOGIC) ===
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetName = item.innerText.trim();
            
            // Если это выход — не прерываем переход по ссылке
            if(targetName === 'Выйти') return; 
            
            e.preventDefault();

            // Убираем активный класс у всех ссылок и даем нажатой
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Скрываем все секции МГНОВЕННО (чтобы не занимали место)
            sections.forEach(sec => {
                sec.classList.remove('active');
                sec.classList.add('hidden'); // hidden должен иметь display: none !important в CSS
            });

            // Определяем, какую секцию открыть
            let targetId = (targetName === "Профиль") ? 'profile-section' : 'dashboard-section';
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.remove('hidden');
                // Задержка 10мс нужна, чтобы браузер успел применить display: block перед началом анимации
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 10);
            }
        });
    });

    // === 2. ЭФФЕКТ ПЕЧАТИ AI (ТВОЙ КОД) ===
    const aiTextElement = document.getElementById('ai-typing-text');
    const aiMessage = "Привет, Алекс! Твоя дневная норма калорий в норме. Рекомендую сегодня сделать упор на белки (куриная грудка или тофу), так как вчера была силовая тренировка. Готов начать?";
    let charIndex = 0;

    function typeWriter() {
        if (aiTextElement && charIndex < aiMessage.length) {
            aiTextElement.innerHTML = aiMessage.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
            setTimeout(typeWriter, 30);
        }
    }
    setTimeout(typeWriter, 800);

    // === 3. СЧЕТЧИКИ ЦИФР (COUNT-UP) ===
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
            const inc = target / speed;

            if (count < target) {
                if (target % 1 !== 0) {
                    counter.innerText = (count + inc).toFixed(1);
                } else {
                    counter.innerText = Math.ceil(count + inc);
                }
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // === 4. ПРОГРЕСС-БАРЫ ===
    const progressBars = document.querySelectorAll('.progress-fill');
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }, 500);

    // === 5. МОБИЛЬНОЕ МЕНЮ ===
    const burgerBtn = document.getElementById('burger-btn');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');

    if(burgerBtn) burgerBtn.addEventListener('click', () => sidebar.classList.add('open'));
    if(closeBtn) closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));

    // === 6. РЕДАКТИРОВАНИЕ ПРОФИЛЯ (ВНУТРИ СЕКЦИИ) ===
    const editBtn = document.getElementById('toggle-edit-mode');
    const cancelBtn = document.getElementById('cancel-edit');
    const viewCard = document.getElementById('profile-view-card');
    const editForm = document.getElementById('profile-edit-form');

    if (editBtn && viewCard && editForm) {
        editBtn.addEventListener('click', () => {
            viewCard.classList.add('hidden');
            editForm.classList.remove('hidden');
        });
        cancelBtn.addEventListener('click', () => {
            editForm.classList.add('hidden');
            viewCard.classList.remove('hidden');
        });
    }
});