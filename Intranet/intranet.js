// Elementos del DOM
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Variables para el estado de la aplicación
let isAnimating = false;

// Event Listeners para los botones de toggle
registerBtn.addEventListener('click', () => {
    if (!isAnimating) {
        toggleToRegister();
    }
});

loginBtn.addEventListener('click', () => {
    if (!isAnimating) {
        toggleToLogin();
    }
});

// Funciones de toggle con animación mejorada
function toggleToRegister() {
    isAnimating = true;
    container.classList.add("active");
    
    // Añadir efecto de vibración sutil
    container.style.transform = 'scale(1.01)';
    
    setTimeout(() => {
        container.style.transform = 'scale(1)';
        isAnimating = false;
    }, 600);
}

function toggleToLogin() {
    isAnimating = true;
    container.classList.remove("active");
    
    // Añadir efecto de vibración sutil
    container.style.transform = 'scale(1.01)';
    
    setTimeout(() => {
        container.style.transform = 'scale(1)';
        isAnimating = false;
    }, 600);
}

// Manejo de formularios
document.addEventListener("DOMContentLoaded", function() {
    // Inicialización de formularios
    initializeForms();
    
    // Inicializar efectos visuales
    initializeVisualEffects();
    
    // Manejo de inputs con animaciones
    handleInputAnimations();
});

// Función para inicializar los formularios
function initializeForms() {
    // Manejo del formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Manejo del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
}

// Manejo del envío del formulario de registro
function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        username: e.target.querySelectorAll('input[type="text"]')[1].value,
        password: e.target.querySelector('input[type="password"]').value
    };
    
    // Validación básica
    if (validateRegisterForm(userData)) {
        showLoadingState(e.target);
        
        // Simular petición al servidor
        setTimeout(() => {
            hideLoadingState(e.target);
            showSuccessMessage('¡Registro exitoso! Bienvenido a DC Style.');
            
            // Cambiar automáticamente al login después del registro
            setTimeout(() => {
                toggleToLogin();
            }, 1500);
        }, 2000);
    }
}

// Manejo del envío del formulario de login
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const userData = {
        email: e.target.querySelector('input[type="email"]').value,
        password: e.target.querySelector('input[type="password"]').value
    };
    
    // Validación básica
    if (validateLoginForm(userData)) {
        showLoadingState(e.target);
        
        // Simular petición al servidor
        setTimeout(() => {
            hideLoadingState(e.target);
            showSuccessMessage('¡Inicio de sesión exitoso! Redirigiendo...');
            
            // Redirección después del login exitoso
            setTimeout(() => {
                window.location.href = '../intranex.html/Dashboard.html';
            }, 1500);
        }, 2000);
    }
}

// Validación del formulario de registro
function validateRegisterForm(userData) {
    const errors = [];
    
    // Validar nombre
    if (!userData.name || userData.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
        errors.push('Ingresa un email válido');
    }
    
    // Validar usuario
    if (!userData.username || userData.username.trim().length < 3) {
        errors.push('El usuario debe tener al menos 3 caracteres');
    }
    
    // Validar contraseña
    if (!userData.password || userData.password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

// Validación del formulario de login
function validateLoginForm(userData) {
    const errors = [];
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
        errors.push('Ingresa un email válido');
    }
    
    // Validar contraseña
    if (!userData.password || userData.password.length < 1) {
        errors.push('Ingresa tu contraseña');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

// Estados de carga para botones
function showLoadingState(form) {
    const button = form.querySelector('.auth-btn');
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    button.style.opacity = '0.7';
    
    // Guardar el texto original para restaurarlo después
    button.dataset.originalText = originalText;
}

function hideLoadingState(form) {
    const button = form.querySelector('.auth-btn');
    
    button.disabled = false;
    button.textContent = button.dataset.originalText;
    button.style.opacity = '1';
}

// Sistema de notificaciones
function showSuccessMessage(message) {
    createNotification(message, 'success');
}

function showErrorMessage(message) {
    createNotification(message, 'error');
}

function createNotification(message, type) {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' : 'linear-gradient(45deg, #f44336, #da190b)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.5s ease-out;
        font-family: 'Montserrat', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Efectos visuales adicionales
function initializeVisualEffects() {
    // Añadir animaciones CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            margin-left: 15px;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(255,255,255,0.2);
        }
        
        .input-group input:invalid {
            border-color: #f44336;
        }
        
        .input-group input:valid {
            border-color: #4CAF50;
        }
    `;
    document.head.appendChild(style);
}

// Manejo de animaciones de inputs
function handleInputAnimations() {
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        // Efecto de focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Efecto de blur
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validación en tiempo real
            if (this.value.trim() !== '') {
                validateInputInRealTime(this);
            }
        });
        
        // Efecto de typing
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('has-content');
            } else {
                this.parentElement.classList.remove('has-content');
            }
        });
    });
}

// Validación en tiempo real
function validateInputInRealTime(input) {
    const inputType = input.type;
    const inputValue = input.value.trim();
    
    let isValid = true;
    
    switch (inputType) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(inputValue);
            break;
        case 'password':
            isValid = inputValue.length >= 6;
            break;
        case 'text':
            if (input.placeholder.toLowerCase().includes('nombre')) {
                isValid = inputValue.length >= 2;
            } else if (input.placeholder.toLowerCase().includes('usuario')) {
                isValid = inputValue.length >= 3;
            }
            break;
    }
    
    // Aplicar estilos de validación
    if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
    }
}

// Manejo de teclas especiales
document.addEventListener('keydown', function(e) {
    // Enter para enviar formularios
    if (e.key === 'Enter') {
        const activeForm = container.classList.contains('active') ? registerForm : loginForm;
        if (activeForm && document.activeElement.tagName === 'INPUT') {
            e.preventDefault();
            activeForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape para cerrar notificaciones
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Manejo de enlaces sociales (simulado)
document.addEventListener('click', function(e) {
    if (e.target.closest('.social-icons a')) {
        e.preventDefault();
        const platform = e.target.closest('a').querySelector('i').className;
        let platformName = 'Social Media';
        
        if (platform.includes('google')) platformName = 'Google';
        else if (platform.includes('facebook')) platformName = 'Facebook';
        else if (platform.includes('github')) platformName = 'GitHub';
        else if (platform.includes('linkedin')) platformName = 'LinkedIn';
        
        showSuccessMessage(`Función de ${platformName} próximamente disponible`);
    }
});

// Funcionalidad del enlace "¿Olvidaste tu contraseña?"
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('forgot-password')) {
        e.preventDefault();
        showSuccessMessage('Se ha enviado un enlace de recuperación a tu email (funcionalidad simulada)');
    }
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error detectado:', e.error);
    showErrorMessage('Ha ocurrido un error inesperado. Por favor, intenta nuevamente.');
});

// Función para sistema de calificación con estrellas (del código original)
document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll('.rating input');
    
    stars.forEach((star) => {
        star.addEventListener('change', function() {
            const rating = this.value;
            showSuccessMessage(`¡Gracias por tu calificación de ${rating} estrellas!`);
        });
    });
});

// Función para precargar recursos
function preloadResources() {
    const images = ['imagenes/Logo.jpeg', 'imagenes/peru.png'];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar precarga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', preloadResources);

// Exportar funciones para uso global si es necesario
window.AuthSystem = {
    toggleToRegister,
    toggleToLogin,
    showSuccessMessage,
    showErrorMessage
};