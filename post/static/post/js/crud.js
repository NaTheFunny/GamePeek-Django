document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('post-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('content', document.getElementById('content').value);
        formData.append('image', document.getElementById('image').files[0]);
        formData.append('price', document.getElementById('price').value);

        fetch('/api/post/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Nuevos datos obtenidos: ', data);
            location.reload();
        })
        .catch(error => {
            console.log('Error: ', error);
        });
    });
});
