async function viewPost(event) {
    event.preventDefault();
        
        const category_id = document.querySelector('button[name="category_btn"]').value;

        const response = await fetch(`/api/categories/` + category_id, {
            method: 'GET', 
            // where: 
            // category_id = req.params.category_id
        });
        if (response.ok) {        
            document.location.replace('/api/categories/' + category_id);
        } else {
            alert(response.statusText);
        }
        console.log(category_id)
}

document.querySelector('#category_icon').addEventListener('click', viewPost);

