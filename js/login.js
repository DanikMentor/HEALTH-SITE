document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('form');

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailValue = document.getElementById('email').value;
            const usernameValue = document.getElementById('username')?.value; // ? если поля нет

            // Создаем имя
            const displayName = usernameValue || emailValue.split('@')[0];

            // Создаем объект
            const userData = {
                name: displayName,
                email: emailValue,
                avatar: "https://i.pravatar.cc/150?img=32"
            };

            // СОХРАНЯЕМ В ЛОКАЛЬНУЮ ПАМЯТЬ
            localStorage.setItem('user', JSON.stringify(userData));

            // Перенаправляем на главную
            window.location.href = 'index.html';
        });
    }
});