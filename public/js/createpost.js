// Add event listener for the form submission.
document.getElementById("createPost").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the values of the title & content fields.
    const title = document.getElementById("create_title").value.trim();
    const content = document.getElementById("create_content").value.trim();
    
    // Send a POST request to create a new post.
    fetch('/api/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(  {
            "title": title,
            "content": content
          }),
    }).then((result) => {
        if (!result.ok) {
            // If the response is not ok then display an error.
            alert("Error, cannot create post");
            return;
        }
        // If the response is successful then redirect to the dashboard.
        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
});

// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.