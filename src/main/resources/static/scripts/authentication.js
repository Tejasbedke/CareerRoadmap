document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');

    if (action === 'signup') {
        showNotification('Account created successfully! Please verify your email.');
    } else if (action === 'login') {
        showNotification('Logged in successfully! Complete verification.');
    }

    setupVerificationInputs();
});

function setupVerificationInputs() {
    const inputs = document.querySelectorAll('.verification-digit');
    const verifyButton = document.querySelector('.verify-btn');

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            const maxLength = input.getAttribute('maxlength');

            // Only proceed if input length matches maxlength (1 in this case)
            if (value.length === maxLength) {
                // Move to the next input if it exists
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }

            // Enable "Verify" button only if all inputs are filled
            const allFilled = Array.from(inputs).every(input => input.value.length === 1);
            verifyButton.disabled = !allFilled;
        });


        input.addEventListener('keydown', (e) => {
            // Allow backspace to move to previous input and clear
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }

            // Allow arrow key navigation
            if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            if (e.key === 'ArrowLeft' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
}

function verifyCode() {
    const inputs = document.querySelectorAll('.verification-digit');
    const code = Array.from(inputs).map(input => input.value).join('');

    if (code.length === 6) {
        // Simulate verification (replace with actual verification logic)
        showNotification('Verification successful! Welcome to your account.');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    } else {
        showNotification('Please enter a complete 6-digit code', 'error');
    }
}

function resendCode() {
    showNotification('A new verification code has been sent to your email.');
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    notification.textContent = message;

    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else {
        notification.style.backgroundColor = '#f44336';
    }

    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}