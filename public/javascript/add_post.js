async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('input[name="post-description"]').value;
    const product_category = document.querySelector('select[name="post-category"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            product_category
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert("Post Saved"),
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);