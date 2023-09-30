// Add event listener for the form submission.
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Get the values of the username & password fields.
    const name = document.getElementById("login_username").value.trim();
    const password = document.getElementById("login_password").value.trim();

    // Send a POST request to authenticate the user.
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "username" : name,
            "password" : password
        }),
    }).then((result) => {
        if (!result.ok) {
            // If the response is not ok then display an alert.
            alert("Invalid username or password");
            return;
        }
        // If the response is successful then redirect to home.
        result.json().then(() => {
            window.location = '/';
        });
    });
});


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.