document.getElementById("createForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("create_username").value.trim();
    const email = document.getElementById("create_email").value.trim();
    const password = document.getElementById("create_password").value.trim();

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(  {
            "username": username,
            "email": email,
            "password": password
          }),
    }).then((result) => {
        if (!result.ok) {
            alert("Invalid username, email or password ");
            return;
        }

        result.json().then(() => {
            window.location = '/';
            
        });
    });
}); 