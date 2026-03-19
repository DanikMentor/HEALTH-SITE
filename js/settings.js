document.addEventListener('DOMContentLoaded', () => {
    
    // 1. НАВИГАЦИЯ ПО САЙДБАРУ
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.settings-section');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем переход по ссылке

            // 1. Убираем active у всех ссылок и добавляем кликнутой
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // 2. Скрываем все разделы и показываем нужный
            const targetSectionId = this.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSectionId) {
                    section.classList.add('active');
                }
            });

            // 3. Плавно скроллим вверх контентной области (для мобилок)
            if (window.innerWidth < 768) {
                window.scrollTo({ top: document.querySelector('.settings-content').offsetTop - 100, behavior: 'smooth' });
            }
        });
    });

    // 2. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (Визуал)
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;

    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedTheme = this.getAttribute('data-theme');

            // 1. Визуально переключаем активную карточку в настройках
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // 2. Переключаем класс на body для смены CSS переменных
            if (selectedTheme === 'light') {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
            }
        });
    });

    // 3. ЭФФЕКТ ШАПКИ ПРИ СКРОЛЛЕ (копия с других страниц)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 5%';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.padding = '18px 5%';
            header.style.boxShadow = 'none';
        }
    });
});