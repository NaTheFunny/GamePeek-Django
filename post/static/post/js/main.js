document.addEventListener('DOMContentLoaded',function(){
    const cardContainer = document.getElementById('card-container');
    fetch('/api/post/')
        .then(response => {
            if (!response.ok){
                throw new Error('No ha respondido');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(post => {
                const card = document.createElement('div');
                card.classList.add('card')

                const title = document.createElement('h2');
                title.textContent = post.title;

                const content = document.createElement('p')
                content.textContent = post.content;

                const price = document.createElement('h2')
                price.textContent ='$'+ post.price

                const image = document.createElement('img')
                image.src = post.image;
                image.alt = post.title;

                const carritoButton = document.createElement('button');
                carritoButton.textContent = 'Agregar al Carrito';
                carritoButton.classList.add('btn', 'btn-primary');
                carritoButton.setAttribute('data-id',post.id)
                carritoButton.addEventListener('click', function() {
                    alert('Artículo agregado al carrito');
                    agregarAlCarrito(post.id);
                    // Aquí puedes agregar lógica para añadir al carrito
                });

                const editarButton = document.createElement('a');
                editarButton.href = `/editar/${post.id}/`;
                editarButton.classList.add('btn','btn-primary','btn-lg','active');
                editarButton.role = 'button';
                editarButton.ariaPressed = 'true';
                editarButton.textContent = 'Editar';

                const deleteButton = document.createElement('a');
                deleteButton.href = `/eliminar/${post.id}/`;
                deleteButton.classList.add('btn','btn-primary','btn-lg','active');
                deleteButton.role = 'button';
                deleteButton.ariaPressed = 'true';
                deleteButton.textContent = 'Eliminar';

                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(content);
                card.appendChild(image);           
                card.appendChild(editarButton);
                card.appendChild(deleteButton);
                if (user.is_authenticated) {
                    card.appendChild(carritoButton);
                }

                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error de Promesa fetch: ', error)
        });
});

function agregarAlCarrito(postId) {
    // Lógica para agregar el producto con postId al carrito
    // Puedes hacer una solicitud POST a tu API de carrito aquí, por ejemplo:
    fetch(`/api/carrito/agregar/${postId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Incluir cualquier header de autenticación si es necesario
        },
        body: JSON.stringify({ postId: postId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud de agregar al carrito no fue exitosa');
        }
        alert('Artículo agregado al carrito');
    })
    .catch(error => {
        console.error('Error al agregar al carrito: ', error);
    });
}