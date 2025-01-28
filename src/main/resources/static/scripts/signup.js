
/* function previewImage(event) {
       const file = event.target.files[0];
       const preview = document.getElementById('imagePreview');

       if (file) {
           if (file.size > 5 * 1024 * 1024) { // 5MB limit
               showError('profilePic', 'File size should be less than 5MB');
               event.target.value = '';
               preview.style.display = 'none';
               return;
           }

           const reader = new FileReader();
           reader.onload = function() {
               preview.src = reader.result;
               preview.style.display = 'block';
           }
           reader.readAsDataURL(file);
       }
   }*/

function showError(fieldId, message) {
    const errorDiv = document.getElementById(`${fieldId}-error`);
    const field = document.getElementById(fieldId);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    field.classList.add('input-error');
}

function clearError(fieldId) {
    const errorDiv = document.getElementById(`${fieldId}-error`);
    const field = document.getElementById(fieldId);
    errorDiv.style.display = 'none';
    field.classList.remove('input-error');
}

function validateForm(event) {
    let isValid = true;

    // Clear all errors first
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
    document.querySelectorAll('input, select').forEach(input => input.classList.remove('input-error'));

    // Username validation
    const username = document.getElementById('username').value;
    const usernameRegex = /^[a-z0-9]+$/; // Only lowercase letters and numbers
    if (!usernameRegex.test(username) || username.length < 3) {
        showError('username', 'Username must be at least 3 characters and contain only lowercase letters and numbers');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Invalid email format');
        isValid = false;
    } else {
        isEmailRegistered(email).then(emailExists => {
            if (emailExists) {
                showError('email', 'Email already exists');
                isValid = false;
            }
        });
    }


    // Password validation
    const password = document.getElementById('password').value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        showError(
            'password',
            'Password must be at least 8 characters long and include one letter, one digit, and one special character'
        );
        isValid = false;
    }
    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }

    // Mobile number validation
    const mobileNumber = document.getElementById('mobileNumber').value;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!phoneRegex.test(mobileNumber)) {
        showError('mobileNumber', 'Invalid mobile number format (must be a valid Indian number)');
        isValid = false;
    }

    // DOB validation
    const dob = new Date(document.getElementById('dob').value);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 13) {
        showError('dob', 'You must be at least 13 years old');
        isValid = false;
    }

    // If the form is valid, submit it
    if (isValid) {
        return true;  // Allow form submission

    } else {
        event.preventDefault();  // Prevent form submission if invalid
        return false;  // Don't submit the form
    }
}
