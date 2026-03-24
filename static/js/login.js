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
    e.preventDefault(); // Останавливаем перезагрузку, чтобы показать анимацию

    // 1. Показываем спиннер на кнопке
    submitBtn.disabled = true;
    btnText.classList.add('hidden'); // Текст "Создать аккаунт" исчезает
    loader.classList.remove('hidden'); // Появляется иконка загрузки

    // 2. Имитируем задержку "отправки" (например, 1.5 секунды)
    setTimeout(() => {
        // Скрываем форму целиком
        formWrapper.classList.add('hidden');
        // Показываем блок с галочкой успеха
        successWrapper.classList.remove('hidden');
        
        // 3. Через 3 секунды после появления галочки — переходим в кабинет
        setTimeout(() => {
            window.location.href = '/profile/'; 
        }, 3000);

    }, 1500);
    });

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