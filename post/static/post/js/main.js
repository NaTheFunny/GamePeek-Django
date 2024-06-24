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


                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(content);
                card.appendChild(image);

                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error de Promesa fetch: ', error)
        });
});