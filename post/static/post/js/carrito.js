document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('card-container');
    const cartModalElement = document.getElementById('cartModal');
    const cartModal = new bootstrap.Offcanvas(cartModalElement);

    // Función para agregar al carrito
    function agregarAlCarrito(postId ,title, price, image) {
        const cartItemsList = document.getElementById('cartItemsList');
        const existingItem = Array.from(cartItemsList.children).find(item => {
            return item.dataset.postId === postId.toString();
        });

        if (existingItem) {
            // Si el juego ya está en el carrito, aumentar la cantidad
            const quantityElement = existingItem.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent, 10);
            quantity++;
            quantityElement.textContent = quantity;
        } else {
            // Si el juego no está en el carrito, agregar un nuevo elemento
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.dataset.postId = postId;

            const itemName = document.createElement('span');
            itemName.textContent = title;

            const itemPrice = document.createElement('span');
            itemPrice.textContent = '$' + price;

            const itemImage = document.createElement('img');
            itemImage.src = image;
            itemImage.alt = title;
            itemImage.classList.add('cart-item-image');

            const quantity = document.createElement('span');
            quantity.textContent = '1';
            quantity.classList.add('quantity');
            
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', function() {
                listItem.remove(); // Elimina el artículo del DOM
            });

            listItem.appendChild(itemImage);
            listItem.appendChild(itemName);
            listItem.appendChild(itemPrice);
            listItem.appendChild(quantity);
            listItem.appendChild(deleteButton);

            cartItemsList.appendChild(listItem);
        }

        // Mostrar el modal del carrito
        cartModal.show();
    }

    // Event listener para mostrar/ocultar el modal del carrito
    const toggleCartBtn = document.getElementById('toggleCartBtn');
    toggleCartBtn.addEventListener('click', function() {
        cartModal.toggle();
    });

    // Fetch para obtener los datos de la API de juegos
    fetch('/api/post/')
        .then(response => {
            if (!response.ok) {
                throw new Error('No ha respondido');
            }
            return response.json();
        })
        .then(data => {
            cardContainer.innerHTML = '';
            data.forEach(post => {
                // Crear elementos HTML para cada juego
                const card = document.createElement('div');
                card.classList.add('card');

                const title = document.createElement('h2');
                title.textContent = post.title;

                const content = document.createElement('p');
                content.textContent = post.content;

                const price = document.createElement('h2');
                price.textContent = '$' + post.price;

                const image = document.createElement('img');
                image.src = post.image;
                image.alt = post.title;

                const editarButton = document.createElement('a');
                editarButton.href = `/editar/${post.id}/`;
                editarButton.classList.add('btn', 'btn-primary', 'btn-lg', 'active');
                editarButton.role = 'button';
                editarButton.ariaPressed = 'true';
                editarButton.textContent = 'Editar';

                const deleteButton = document.createElement('a');
                deleteButton.href = `/eliminar/${post.id}/`;
                deleteButton.classList.add('btn', 'btn-primary', 'btn-lg', 'active');
                deleteButton.role = 'button';
                deleteButton.ariaPressed = 'true';
                deleteButton.textContent = 'Eliminar';

                const agregarCarritoButton = document.createElement('button');
                agregarCarritoButton.dataset.id = post.id;
                agregarCarritoButton.classList.add('btn', 'btn-success', 'btn-lg', 'active', 'agregar-carrito');
                agregarCarritoButton.textContent = 'Agregar al Carrito';
                agregarCarritoButton.addEventListener('click', function() {
                    agregarAlCarrito(post.id ,post.title, post.price , post.image);
                });

                // Agregar elementos a la card
                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(content);
                card.appendChild(image);
                card.appendChild(editarButton);
                card.appendChild(deleteButton);
                card.appendChild(agregarCarritoButton);

                // Agregar la card al contenedor
                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error de Promesa fetch: ', error);
        });
});
