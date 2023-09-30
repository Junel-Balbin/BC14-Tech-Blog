// Add event listener for the form submission to update a post.
document.getElementById("updatePost").addEventListener("submit", (e) => {
    e.preventDefault();
    // Get the values of the updated title & content fields.
    const title = document.getElementById("update_title").value.trim();
    const content = document.getElementById("update_content").value.trim();
    
    // Send a PUT request to update the post.
    fetch('/api/posts/' + id, {
        method: 'PUT',
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
            alert("Error, cannot update post");
            return;
        }
        // If the response is successful then redirect to the dashboard.
        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
}); 

// Add event listener for the button click to delete a post.
document.getElementById("deletePost").addEventListener("click", (e) => {
    e.preventDefault();

    // Send a DELETE request to delete the post.
    fetch('/api/posts/' + id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    }).then((result) => {
        if (!result.ok) {
            // If the response is not ok then display an error.
            alert("Error, cannot to delete post");
            return;
        }
        // If the response is successful then redirect to the dashboard.
        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
});


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.