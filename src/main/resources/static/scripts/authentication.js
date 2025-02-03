// Get all verification digit inputs and verify button
const verificationInputs = document.querySelectorAll('.verification-digit');
const successNotification = document.getElementById('successNotification');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check URL parameters for actions
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
    const verifyButton = document.querySelector('.verify-btn');

    verificationInputs.forEach((input, index) => {
        // Handle input changes
        input.addEventListener('input', (e) => {
            // Allow only numbers
            const value = e.target.value.replace(/[^0-9]/g, '');
            input.value = value;

            // Move to next input if a digit is entered and maxlength is reached
            if (value && index < verificationInputs.length - 1) {
                verificationInputs[index + 1].focus();
            }

            // Enable/disable verify button based on all inputs being filled
            const allFilled = Array.from(verificationInputs).every(input => input.value.length === 1);
            verifyButton.disabled = !allFilled;
        });

        // Handle keydown events
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                // If current input is empty and backspace is pressed, move to previous input
                if (input.value === '' && index > 0) {
                    verificationInputs[index - 1].focus();
                    verificationInputs[index - 1].select();
                } else {
                    input.value = '';
                }
                e.preventDefault();
            }
            // Handle arrow key navigation
            else if (e.key === 'ArrowLeft' && index > 0) {
                verificationInputs[index - 1].focus();
            }
            else if (e.key === 'ArrowRight' && index < verificationInputs.length - 1) {
                verificationInputs[index + 1].focus();
            }
        });

        // Handle paste event
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');

            if (pastedData) {
                // Distribute pasted numbers across inputs
                [...pastedData].slice(0, verificationInputs.length).forEach((digit, i) => {
                    verificationInputs[i].value = digit;
                });
                // Focus the next empty input or the last input
                const nextEmptyIndex = [...verificationInputs].findIndex(input => !input.value);
                const focusIndex = nextEmptyIndex === -1 ? verificationInputs.length - 1 : nextEmptyIndex;
                verificationInputs[focusIndex].focus();

                // Update verify button state
                const allFilled = Array.from(verificationInputs).every(input => input.value.length === 1);
                verifyButton.disabled = !allFilled;
            }
        });
    });
}

// Function to verify the entered code
function verifyCode() {
    const code = Array.from(verificationInputs)
        .map(input => input.value)
        .join('');

    if (code.length === 6) {
        showNotification('Verification successful! Welcome to your account.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showNotification('Please enter a complete 6-digit code', 'error');
    }
}

// Function to resend verification code
function resendCode() {
    // Here you would typically make an API call to resend the code
    showNotification('A new verification code has been sent to your email.');

    // Clear all inputs
    verificationInputs.forEach(input => {
        input.value = '';
    });
    verificationInputs[0].focus();
}

// Function to show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    notification.textContent = message;

    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else {
        notification.style.backgroundColor = '#f44336';
    }

    notification.style.display = 'block';

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}