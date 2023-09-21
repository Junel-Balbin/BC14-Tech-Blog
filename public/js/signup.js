document.getElementById("createForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const full_name = document.getElementById("create_name").value.trim();
    const name = document.getElementById("create_username").value.trim();
    const password = document.getElementById("create_password").value.trim();
    const email = document.getElementById("create_email").value.trim();

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(  {
            "name": full_name,
            "username": name,
            "email": email,
            "password": password
          }),
    }).then((result) => {
        if (!result.ok) {
            alert("Bad create thing");
            return;
        }

        result.json().then(() => {
            window.location = '/';
            
        });
    });
}); 


/*
function isValidEmail(email) {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Add event listener for email input field
const emailInput = document.getElementById('emailInput');
const emailValidationMessage = document.querySelector('.help.is-danger');

emailInput.addEventListener('input', () => {
    const email = emailInput.value;
    const isValid = isValidEmail(email);

    // Update the styling or show a validation message based on the validity
    if (isValid) {
        emailInput.classList.remove('is-danger');
        emailInput.classList.add('is-success');
        emailValidationMessage.textContent = '';
    } else {
        emailInput.classList.remove('is-success');
        emailInput.classList.add('is-danger');
        emailValidationMessage.textContent = 'This email is invalid';
    }
});
*/