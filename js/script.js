document.addEventListener('DOMContentLoaded', () => {
    // 1. Находим все нужные элементы
    const guestBlock = document.getElementById('authGuest');
    const userBlock = document.getElementById('authUser');
    const nameDisplay = document.getElementById('headerUserName');
    
    const sidebar = document.getElementById('userSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('closeSidebar');

    // --- 2. ЛОГИКА ПРОВЕРКИ ВХОДА ---
    const checkAuth = () => {
        const userData = localStorage.getItem('user');

        if (userData) {
            // Если данные есть в памяти (пользователь вошел)
            const user = JSON.parse(userData);
            
            if (guestBlock) guestBlock.style.display = 'none';
            if (userBlock) {
                userBlock.style.display = 'flex';
                if (nameDisplay) nameDisplay.innerText = user.name;
            }
        } else {
            // Если данных нет (гость)
            if (guestBlock) guestBlock.style.display = 'block';
            if (userBlock) userBlock.style.display = 'none';
        }
    };

    // Глобальная функция выхода (чтобы кнопка в сайдбаре её видела)
    window.simulateLogout = () => {
        localStorage.removeItem('user');
        window.location.href = 'index.html'; // Выходим и идем на главную
    };

    // Запускаем проверку сразу
    checkAuth();

    // --- 3. УПРАВЛЕНИЕ САЙДБАРОМ ---
    const toggleSidebar = () => {
        if (sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('visible');
            // Чтобы страница не крутилась под меню
            document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : 'auto';
        }
    };

    // Вешаем клики (проверяем наличие элементов, чтобы не было ошибок)
    if (userBlock) userBlock.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);
});