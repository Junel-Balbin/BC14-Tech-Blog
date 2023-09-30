// Check if query string exists and is '?hide=true' then hide new comment element.
if (window.location.search && window.location.search === '?hide=true') {
    document.getElementById("newcomment").style.display = "none"

} else {
    // Add event listener for clicking the addcomment button.
    document.getElementById("addcomment").addEventListener("click", (e) => {
        e.preventDefault();
        // Get the value of the new comment & remove leading/trailing whitespace.
        const comment = document.getElementById("newcommenttext").value.trim();
        
        // Send a POST request to create a new comment.
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(  {
                "comment": comment,
                "post_id": post_id
            }),
        }).then((result) => {
            if (!result.ok) {
                alert("Error, cannot create post");
                return;
            }
            // Redirect to the post page after successfully creating comment.
            result.json().then(() => {
                window.location = '/post/'+post_id+'?hide=true';
            });
        });
    }); 
}


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.