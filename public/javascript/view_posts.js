async function viewPost() {
    const response = await fetch(`/api/posts/1`, {
        method: 'GET',
        // body: JSON.stringify({
        //     id: id,
        //     title: title,
        //     description: description,
        //     username: username,            
        // }),
        headers: {
            'Content-Type': 'application/json'
        },
   
    });

    if (response.ok) {        
        document.location.reload();
    } else {
        alert(response.statusText);
    }

    console.log(response);
}

document.querySelector('#auto_btn').addEventListener('click', viewPost);