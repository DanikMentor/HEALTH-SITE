document.addEventListener("DOMContentLoaded", () => {
    
    // БЛОК 1 (ПЕРЕКЛЮЧЕНИЕ СЕКЦИЙ) ПОЛНОСТЬЮ УДАЛЕН!
    // Теперь за переходы по страницам отвечает Django (теги <a> с href)

    // === 2. ЭФФЕКТ ПЕЧАТИ AI ===
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
    // Запускаем только если элемент есть на странице (т.е. мы на Дашборде)
    if (aiTextElement) {
        setTimeout(typeWriter, 800);
    }

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

    // === 6. РЕДАКТИРОВАНИЕ ПРОФИЛЯ (ВНУТРИ СЕКЦИИ ПРОФИЛЯ) ===
    const editBtn = document.getElementById('toggle-edit-mode');
    const cancelBtn = document.getElementById('cancel-edit');
    const viewCard = document.getElementById('profile-view-card');
    const editForm = document.getElementById('profile-edit-form');

    // Сработает только на странице Профиля
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
  