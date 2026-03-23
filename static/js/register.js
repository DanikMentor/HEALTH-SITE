document.addEventListener("DOMContentLoaded", () => {
    // 1. Пароль: Показать/Скрыть
    const togglePwd = document.getElementById('toggle-pwd');
    const pwdInput = document.getElementById('password');

    togglePwd.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
        togglePwd.classList.toggle('fa-eye-slash');
        togglePwd.classList.toggle('fa-eye');
    });

    // 2. Индикатор сложности пароля
    const strengthBar = document.getElementById('strength-bar');
    pwdInput.addEventListener('input', () => {
        const val = pwdInput.value;
        let strength = 0;
        
        if (val.length > 5) strength += 1;
        if (val.length > 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) strength += 1;
        if (val.length > 10 && /[^A-Za-z0-9]/.test(val)) strength += 1;

        strengthBar.className = 'strength-bar'; // Сброс классов
        if (val.length === 0) return;

        if (strength === 0 || strength === 1) strengthBar.classList.add('strength-weak');
        else if (strength === 2) strengthBar.classList.add('strength-medium');
        else strengthBar.classList.add('strength-strong');
    });

    // 3. Параллакс фона
    const container = document.querySelector('.auth-container');
    const blobs = document.querySelectorAll('.parallax');
    
    container.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        blobs.forEach(blob => {
            const speed = blob.getAttribute('data-speed');
            blob.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });

    // 4. Валидация и Симуляция отправки формы
    const form = document.getElementById('register-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');
    const formWrapper = document.getElementById('auth-form-wrapper');
    const successWrapper = document.getElementById('auth-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Останавливаем стандартную отправку

        // Простая проверка (например, совпадает ли пароль)
        // В реальном Django проекте данные полетят на сервер, но для UI мы сделаем красоту:
        
        // Включаем спиннер
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');

        // Симулируем запрос к серверу (2 секунды)
        setTimeout(() => {
            // Скрываем форму, показываем успех
            formWrapper.classList.add('hidden');
            successWrapper.classList.remove('hidden');
            
            // Если нужно, тут можно сделать реальный редирект через 2 сек:
            // window.location.href = '/users/profile/';
        }, 2000);
    });

    // Анимация ошибки для примера (добавь класс .error-shake и .input-error к .input-group при неверном вводе)
    // Это пригодится тебе, когда будешь связывать форму с Django Views
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Показать/Скрыть пароль для всех полей с глазиком
    const toggleIcons = document.querySelectorAll('.toggle-password');
    
    toggleIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            }
        });
    });

    // 2. Валидация совпадения паролей
    const pwd = document.getElementById('password');
    const confirmPwd = document.getElementById('confirm_password');

    function validatePasswords() {
        if (confirmPwd.value === '') return;
        
        if (pwd.value !== confirmPwd.value) {
            confirmPwd.parentElement.classList.add('input-error');
        } else {
            confirmPwd.parentElement.classList.remove('input-error');
            confirmPwd.parentElement.classList.add('input-success');
        }
    }

    confirmPwd.addEventListener('input', validatePasswords);
    pwd.addEventListener('input', validatePasswords);
});