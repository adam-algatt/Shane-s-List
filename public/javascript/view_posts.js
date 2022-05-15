async function viewPost(event) {
        
    const response = await fetch(`/api/posts/1`, {
        method: 'GET',
        body: JSON.stringify({
            post_id: post_id,
            title,
            description,
            username,            
        }),
        headers: {
            'Content-Type': 'application/json'
        },
   
    });

    if (response.ok) {        
        document.location.reload('/');
    } else {
        alert(response.statusText);
    }
    console.log(response);
}

document.querySelector('#auto_btn').addEventListener('click', viewPost);