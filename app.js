// app.js

document.addEventListener("DOMContentLoaded", function() {
    // Initialise l'application web de Telegram
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Nos produits (pour l'exemple, on les met ici directement)
    const products = [
        { id: 1, name: "T-shirt Coton", price: "25 €", image: "file:///C:/Users/St%C3%A9phane%20Lopez/Desktop/mon-catalogue-app/427-406-1.webp" },
        { id: 2, name: "Casquette Logo", price: "15 €", image: "https://placehold.co/300x200/a35eb5/white?text=Casquette" },
        { id: 3, name: "Mug Original", price: "12 €", image: "https://placehold.co/300x200/b55e68/white?text=Mug" },
        { id: 4, name: "Tote Bag", price: "18 €", image: "https://placehold.co/300x200/5eb56e/white?text=Tote+Bag" }
    ];

    const productList = document.getElementById('product-list');

    // Pour chaque produit, on crée une carte HTML et on l'ajoute à la liste
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="buy-button" data-product-id="${product.id}">Ajouter au panier</button>
        `;
        productList.appendChild(card);
    });
    
    // Gérer les clics sur les boutons "Ajouter au panier"
    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('buy-button')) {
            const productId = event.target.dataset.productId;
            // Envoie une donnée au bot pour dire quel produit a été sélectionné
            tg.sendData(`selected_product_${productId}`);
            
            // On peut aussi afficher un petit pop-up de confirmation
            tg.showPopup({
                title: 'Produit ajouté !',
                message: 'Le produit a été ajouté à votre panier.',
                buttons: [{type: 'ok'}]
            });
        }
    });

});


