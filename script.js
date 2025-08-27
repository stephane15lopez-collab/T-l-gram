// Attend que le contenu de la page soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    // --- DONNÉES DE DÉMONSTRATION ---
    // MODIFICATION: "imageUrl" a été remplacé par "videoUrl" et "videoThumbnailUrl"
    const products = [
        { id: 1, name: 'Tropi x Tangie', titleImageUrl: 'https://placehold.co/300x80/0F141E/FFFFFF?text=Tropi+x+Tangie', category: 'Fresh Frozen​', farm: 'Jerome Genetics', videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', videoThumbnailUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Tropi+x+Tangie', description: '⚔️ Croisement : Non communiqué (sélection exclusive Jerome Genetics)<br>👃 Terpènes : 🍇 raisin noir, 🍦 crème sucrée, 🍬 bonbon, ⛽ gaz rond, 🌿 végétal léger<br>😋 Goût : 🍇 raisin mûr, 🍦 texture crémeuse', prices: { '5g': 60, '10g': 100, '20g': 180, '50g': 400 } },
        { id: 2, name: 'Black Cherry', titleImageUrl: 'https://placehold.co/300x80/0F141E/FFFFFF?text=Black+Cherry', category: 'Double Static', farm: 'Shenzen Boyz', videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', videoThumbnailUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Black+Cherry', description: 'Description détaillée pour Black Cherry.<br>👃 Terpènes :<br>😋 Goût :', prices: { '1g': 30, '2g': 50, '5g': 120 } },
        { id: 3, name: 'Gelato 41', titleImageUrl: 'https://placehold.co/300x80/0F141E/FFFFFF?text=Gelato+41', category: 'Frozen Shift', farm: 'Caliplates', videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', videoThumbnailUrl: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Gelato+41', description: 'Description détaillée pour Gelato 41.<br>👃 Terpènes :<br>😋 Goût :', prices: { '2g': 50, '5g': 110, '10g': 200 } },
    ];

    // --- ÉLÉMENTS DU DOM ---
    const mainView = document.getElementById('main-view');
    const detailView = document.getElementById('detail-view');
    const productGrid = document.getElementById('product-grid');
    const categoryFilter = document.getElementById('category-filter');
    const farmFilter = document.getElementById('farm-filter');
    // Le conteneur pour la vidéo/image de la page de détail
    const detailMediaContainer = document.getElementById('detail-media-container');

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
            // MODIFICATION: On utilise la miniature de la vidéo pour la grille
            card.innerHTML = `
                <img src="${product.videoThumbnailUrl}" alt="${product.name}">
                <div class="product-card-info">
                    <img src="${product.titleImageUrl}" alt="${product.name}" style="height: 28px; margin-bottom: 5px;">
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
        
        // On arrête toutes les vidéos qui pourraient être en lecture
        const video = detailMediaContainer.querySelector('video');
        if (video) {
            video.pause();
        }

        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.BackButton.hide();
            window.Telegram.WebApp.MainButton.hide();
        }
    }

    /** Affiche la vue de détail pour un produit spécifique */
    function showDetailView(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // --- MODIFICATION MAJEURE : Création du lecteur vidéo ---
        detailMediaContainer.innerHTML = ''; // On vide le conteneur

        // On crée l'élément vidéo
        const video = document.createElement('video');
        video.src = product.videoUrl;
        video.poster = product.videoThumbnailUrl; // Affiche la miniature avant la lecture
        video.className = 'detail-img-background'; // On réutilise le style de l'image
        video.controls = true; // Affiche les contrôles (play, pause, son...)
        video.playsInline = true; // Important pour une bonne expérience sur mobile

        // On crée le logo qui se superpose
        const logo = document.createElement('img');
        logo.src = "mon-logo.png"; // Mettez le chemin vers votre logo
        logo.alt = "Logo du Bot";
        logo.className = "logo-overlay";
        
        // On ajoute la vidéo et le logo au conteneur
        detailMediaContainer.appendChild(video);
        detailMediaContainer.appendChild(logo);
        
        // On cache le logo (comme demandé précédemment)
        logo.classList.add('hidden');
        // --- FIN DE LA MODIFICATION MAJEURE ---

        document.getElementById('detail-farm').textContent = product.farm;
        document.getElementById('detail-name').innerHTML = `
            <img src="${product.titleImageUrl}" alt="${product.name}" style="height: 40px; margin-top: 4px;">
        `;
        document.getElementById('detail-category-badge').textContent = product.category.toUpperCase();
        document.getElementById('detail-description').innerHTML = product.description;
        
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
        
        mainView.classList.add('hidden');
        detailView.classList.remove('hidden');
        window.scrollTo(0, 0);

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
            (selectedFarm === 'all' || product.farm === selectedFarm)
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

    renderProducts(products);
});
