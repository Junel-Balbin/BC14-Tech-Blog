document.getElementById("updatePost").addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("update_content").value.trim();
    const title = document.getElementById("update_title").value.trim();
    
    fetch('/api/posts/' + id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(  {
            "content": content,
            "title": title
          }),
    }).then((result) => {
        if (!result.ok) {
            alert("Error, cannot update post");
            return;
        }

        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
}); 


document.getElementById("deletePost").addEventListener("click", (e) => {
    e.preventDefault();

    const content = document.getElementById("update_content").value.trim();
    const title = document.getElementById("update_title").value.trim();
    
    fetch('/api/posts/' + id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    }).then((result) => {
        if (!result.ok) {
            alert("Error, cannot to delete post");
            return;
        }

        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
});