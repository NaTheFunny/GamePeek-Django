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

                const agregarCarritoButton = document.createElement('button');
                agregarCarritoButton.dataset.id = post.id;
                agregarCarritoButton.classList.add('btn', 'btn-success', 'btn-lg', 'active', 'agregar-carrito');
                agregarCarritoButton.textContent = 'Agregar al Carrito';
                agregarCarritoButton.addEventListener('click', function() {
                    agregarAlCarrito(post.id, post.title, post.price);
                    cartModal.show(); // Mostrar el carrito al agregar un artículo
                });

                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(content);
                card.appendChild(image);           
                card.appendChild(editarButton);
                card.appendChild(deleteButton);
                card.appendChild(agregarCarritoButton);

                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error de Promesa fetch: ', error)
        });
        function agregarAlCarrito(postId, title, price) {
            // Verificar si ya existe el juego en el carrito
            const cardContainer = document.getElementById('card-container');
            const cartModal = new bootstrap.Offcanvas(document.getElementById('cartModal'));
            const cartItemsList = document.getElementById('cartItemsList');
            const existingItem = Array.from(cartItemsList.children).find(item => {
                return item.dataset.postId === postId.toString();
            });
    
            if (existingItem) {
                // Si ya existe, aumentar la cantidad o hacer algo según tu lógica
                const quantityElement = existingItem.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent, 10);
                quantity++;
                quantityElement.textContent = quantity;
            } else {
                // Si no existe, crear un nuevo elemento en el carrito
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.dataset.postId = postId;
    
                const itemName = document.createElement('span');
                itemName.textContent = title;
    
                const itemPrice = document.createElement('span');
                itemPrice.textContent = '$' + price;
    
                const quantity = document.createElement('span');
                quantity.textContent = '1';
                quantity.classList.add('quantity');
    
                listItem.appendChild(itemName);
                listItem.appendChild(itemPrice);
                listItem.appendChild(quantity);
    
                cartItemsList.appendChild(listItem);
            }
    
            // Actualizar el contador de artículos en el carrito (opcional)
            const toggleCartBtn = document.getElementById('toggleCartBtn');
            toggleCartBtn.addEventListener('click', function() {
                cartModal.toggle();
            });
        }
    
        // Event listener para mostrar/ocultar el carrito modal
        const toggleCartBtn = document.getElementById('toggleCartBtn');
        toggleCartBtn.addEventListener('click', function() {
            cartModal.toggle();
        });
});
