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
            alert("Unsuccessful Due To Unsecure Invalid Password.");
            return;
        }

        result.json().then(() => {
            window.location = '/';
        });
    });
}); 


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.