// Attend que le contenu de la page soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    // --- DONNÉES DE DÉMONSTRATION ---
    const products = [
        { id: 1, name: 'Nek Breaker', category: 'fleurs', farm: 'Nektar Farm', imageUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Nek+Breaker', description: '⚔️ Croisement : Non communiqué (sélection exclusive Nektar Farm)<br>👃 Terpènes : 🍇 raisin noir, 🍦 crème sucrée, 🍬 bonbon, ⛽ gaz rond, 🌿 végétal léger<br>😋 Goût : 🍇 raisin mûr, 🍦 texture crémeuse, 🍬 douceur candy, ⛽ gaz, 🌿 herbacé doux', prices: { '5g': 60, '10g': 100, '20g': 180, '50g': 400 } },
        { id: 2, name: 'Brain Juice', category: 'huiles', farm: 'Nektar Farm', imageUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Brain+Juice', description: 'Description détaillée pour Brain Juice.', prices: { '1g': 30, '2g': 55, '5g': 120 } },
        { id: 3, name: 'Green Power', category: 'fleurs', farm: 'Green Farm', imageUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Green+Power', description: 'Description détaillée pour Green Power.', prices: { '5g': 50, '10g': 90, '20g': 160 } },
        { id: 4, name: 'Bio Hash', category: 'resines', farm: 'Bio Farm', imageUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Bio+Hash', description: 'Description détaillée pour Bio Hash.', prices: { '3g': 45, '5g': 70, '10g': 130 } },
        { id: 5, name: 'Yellow Zlushi', category: 'fleurs', farm: 'CH3', imageUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Bio+Hash', description: 'Cali Hollandaise.', prices: { '5g': 60, '10g': 90, '10g': 130 } },
    ];

    // --- ÉLÉMENTS DU DOM ---
    const mainView = document.getElementById('main-view');
    const detailView = document.getElementById('detail-view');
    const productGrid = document.getElementById('product-grid');
    const categoryFilter = document.getElementById('category-filter');
    const farmFilter = document.getElementById('farm-filter');
    // On sélectionne le logo de la page de détail
    const logoOverlay = document.querySelector('.logo-overlay');

    // --- FONCTIONS ---

    /** Affiche les produits dans la grille */
    function renderProducts(productsToDisplay) {
        productGrid.innerHTML = '';
        if (productsToDisplay.length === 0) {
            productGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); margin-top: 2rem;">Aucun produit ne correspond à votre recherche.</p>`;
            return;
        }
        productsToDisplay.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.productId = product.id;
            card.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="product-card-info">
                    <h3>${product.name}</h3>
                    <p>${product.farm}</p>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }
    
    /** Affiche la vue de la grille et cache la vue de détail */
    function showGridView() {
        mainView.classList.remove('hidden');
        detailView.classList.add('hidden');
        // On s'assure que le logo sera de nouveau visible la prochaine fois
        if (logoOverlay) logoOverlay.classList.remove('hidden');

        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.BackButton.hide();
            window.Telegram.WebApp.MainButton.hide();
        }
    }

    /** Affiche la vue de détail pour un produit spécifique */
    function showDetailView(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Remplissage des informations
        document.getElementById('detail-img').src = product.imageUrl;
        document.getElementById('detail-farm').textContent = product.farm;
        document.getElementById('detail-name').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #F472B6;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            ${product.name}
        `;
        document.getElementById('detail-category-badge').textContent = product.category.toUpperCase();
        document.getElementById('detail-description').innerHTML = product.description;
        
        // Remplissage des prix
        const pricesContainer = document.getElementById('detail-prices');
        pricesContainer.innerHTML = '';
        for (const [quantity, price] of Object.entries(product.prices)) {
            pricesContainer.innerHTML += `
                <div class="price-item">
                    <span class="quantity">${quantity}</span>
                    <span class="price">${price}€</span>
                </div>
            `;
        }
        
        // --- MODIFICATION ---
        // On cache le logo de la page de détail
        if (logoOverlay) logoOverlay.classList.add('hidden');

        mainView.classList.add('hidden');
        detailView.classList.remove('hidden');
        window.scrollTo(0, 0);

        // Intégration Telegram
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.BackButton.show();
            window.Telegram.WebApp.MainButton.setText(`Commander ${product.name}`).show();
        }
    }

    /** Filtre les produits et les affiche */
    function filterAndRender() {
        const selectedCategory = categoryFilter.value;
        const selectedFarm = farmFilter.value;
        const filteredProducts = products.filter(product => 
            (selectedCategory === 'all' || product.category === selectedCategory) &&
            (selectedFarm === 'all' || product.farm.toLowerCase().includes(selectedFarm))
        );
        renderProducts(filteredProducts);
    }

    // --- ÉVÉNEMENTS & INITIALISATION ---

    productGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.product-card');
        if (card) {
            const productId = parseInt(card.dataset.productId, 10);
            showDetailView(productId);
        }
    });

    categoryFilter.addEventListener('change', filterAndRender);
    farmFilter.addEventListener('change', filterAndRender);
    
    // Initialisation de l'API Telegram
    try {
        const tg = window.Telegram.WebApp;
        tg.ready(); 
        tg.expand();
        tg.setHeaderColor(getComputedStyle(document.documentElement).getPropertyValue('--primary-bg').trim());
        tg.setBackgroundColor(getComputedStyle(document.documentElement).getPropertyValue('--primary-bg').trim());
        tg.BackButton.onClick(showGridView);
        tg.MainButton.onClick(() => {
            tg.showAlert('La fonctionnalité de commande n\'est pas encore implémentée.');
        });
    } catch (e) {
        console.error("L'API Telegram Web App n'est pas disponible.", e);
    }

    // Affichage initial
    renderProducts(products);
});
