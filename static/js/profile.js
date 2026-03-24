document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Анимация счетчиков (Count-up)
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200; // Чем меньше, тем быстрее
            const inc = target / speed;

            if (count < target) {
                // Округляем до 1 знака после запятой, если есть дробь (для веса и воды)
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

    // 2. Эффект печати текста для AI
    const aiTextElement = document.getElementById('ai-typing-text');
    const aiMessage = "Привет, Алекс! Твоя дневная норма калорий в норме. Рекомендую сегодня сделать упор на белки (куриная грудка или тофу), так как вчера была силовая тренировка. Готов начать?";
    let i = 0;

    function typeWriter() {
        if (i < aiMessage.length) {
            aiTextElement.innerHTML = aiMessage.substring(0, i + 1) + '<span class="cursor"></span>';
            i++;
            setTimeout(typeWriter, 30); // Скорость печати
        } else {
            // Оставляем мигающий курсор в конце
            aiTextElement.innerHTML = aiMessage + '<span class="cursor"></span>';
        }
    }
    
    // Запускаем печать с небольшой задержкой
    setTimeout(typeWriter, 800);

    // 3. Анимация прогресс-баров
    const progressBars = document.querySelectorAll('.progress-fill');
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }, 500); // Запускаем после того, как карточки появились

    // 4. Мобильное меню (Sidebar)
    const burgerBtn = document.getElementById('burger-btn');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');

    burgerBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});