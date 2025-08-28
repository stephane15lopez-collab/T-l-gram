document.addEventListener('DOMContentLoaded', () => {

    // --- DONNÉES DE L'APPLICATION ---
    // Toutes les données sont ici. Remplacez les chemins par les vôtres.
    // Structure du dossier "assets":
    // assets/
    //   -> logo.png
    //   -> categories/
    //      -> fleurs.png
    //      -> resines.png
    //      ...
    //   -> videos/
    //      -> nekbreaker.mp4
    //      ...
    //   -> thumbnails/
    //      -> nekbreaker.jpg
    //      ...
    const data = {
        categories: [
            { id: 1, name: "Fleurs", image: "assets/categories/fleurs.png" },
            { id: 2, name: "Résines", image: "assets/categories/resines.png" },
            { id: 3, name: "Vapes", image: "assets/categories/vapes.png" },
            { id: 4, name: "Huiles", image: "assets/categories/huiles.png" },
            { id: 5, name: "Concentrés", image: "assets/categories/concentres.png" },
            { id: 6, name: "Gummies", image: "assets/categories/gummies.png" },
        ],
        products: [
            { id: 101, categoryId: 1, name: "Nek Breaker", video: "assets/videos/nekbreaker.mp4", thumbnail: "assets/thumbnails/nekbreaker.jpg", farm: "Nektar Farm", taste: "Raisin mûr, crémeux, douceur candy, gaz, herbacé", terpenes: ["Raisin noir", "Crème sucrée", "Bonbon", "Gaz rond"], prices: [{ weight: "5g", price: "60€" }, { weight: "10g", price: "100€" }] },
            { id: 102, categoryId: 1, name: "Purple Haze", video: "assets/videos/purplehaze.mp4", thumbnail: "assets/thumbnails/purplehaze.jpg", farm: "Green Valley", taste: "Baies sucrées, terreux, épicé", terpenes: ["Myrcène", "Caryophyllène"], prices: [{ weight: "3g", price: "45€" }, { weight: "5g", price: "70€" }] },
            { id: 201, categoryId: 2, name: "Royal Hash", video: "assets/videos/royalhash.mp4", thumbnail: "assets/thumbnails/royalhash.jpg", farm: "Desert Kings", taste: "Épicé, pin, terreux", terpenes: ["Pinène", "Humulène"], prices: [{ weight: "2g", price: "30€" }, { weight: "5g", price: "65€" }] },
            { id: 202, categoryId: 2, name: "Afghan Gold", video: "assets/videos/afghangold.mp4", thumbnail: "assets/thumbnails/afghangold.jpg", farm: "Hindu Kush Masters", taste: "Boisé, floral, sucré", terpenes: ["Linalol", "Myrcène"], prices: [{ weight: "2g", price: "35€" }, { weight: "5g", price: "75€" }] },
            { id: 301, categoryId: 3, name: "Vape Pen Mango", video: "assets/videos/vapemango.mp4", thumbnail: "assets/thumbnails/vapemango.jpg", farm: "Juicy Co.", taste: "Mangue tropicale, sucré", terpenes: ["Myrcène", "Limonène"], prices: [{ weight: "1ml", price: "40€" }] },
            { id: 302, categoryId: 3, name: "Vape Pen Berry", video: "assets/videos/vapeberry.mp4", thumbnail: "assets/thumbnails/vapeberry.jpg", farm: "Juicy Co.", taste: "Mélange de baies", terpenes: ["Linalol", "Pinène"], prices: [{ weight: "1ml", price: "40€" }] },
            { id: 401, categoryId: 4, name: "Huile CBD 20%", video: "assets/videos/huile20.mp4", thumbnail: "assets/thumbnails/huile20.jpg", farm: "Bio Labs", taste: "Naturel, herbacé", terpenes: ["Spectre complet"], prices: [{ weight: "10ml", price: "50€" }] },
            { id: 402, categoryId: 4, name: "Huile CBN 10%", video: "assets/videos/huile10.mp4", thumbnail: "assets/thumbnails/huile10.jpg", farm: "Bio Labs", taste: "Léger, noisette", terpenes: ["Spectre complet"], prices: [{ weight: "10ml", price: "60€" }] },
            { id: 501, categoryId: 5, name: "Crumble Wax", video: "assets/videos/crumble.mp4", thumbnail: "assets/thumbnails/crumble.jpg", farm: "Extract Heroes", taste: "Citron, pin", terpenes: ["Limonène", "Pinène"], prices: [{ weight: "1g", price: "45€" }] },
            { id: 502, categoryId: 5, name: "Shatter Clear", video: "assets/videos/shatter.mp4", thumbnail: "assets/thumbnails/shatter.jpg", farm: "Extract Heroes", taste: "Agrumes, diesel", terpenes: ["Limonène", "Myrcène"], prices: [{ weight: "1g", price: "50€" }] },
            { id: 601, categoryId: 6, name: "Gummies Fraise", video: "assets/videos/gummyfraise.mp4", thumbnail: "assets/thumbnails/gummyfraise.jpg", farm: "Candy Meds", taste: "Fraise sucrée", terpenes: ["Sans terpènes ajoutés"], prices: [{ weight: "10 pcs", price: "25€" }] },
            { id: 602, categoryId: 6, name: "Gummies Pêche", video: "assets/videos/gummypeche.mp4", thumbnail: "assets/thumbnails/gummypeche.jpg", farm: "Candy Meds", taste: "Pêche juteuse", terpenes: ["Sans terpènes ajoutés"], prices: [{ weight: "10 pcs", price: "25€" }] },
        ]
    };

    // --- ÉLÉMENTS DU DOM ---
    const app = document.getElementById('app');
    const header = document.getElementById('app-header');

    // --- INTÉGRATION TELEGRAM ---
    try {
        const tg = window.Telegram.WebApp;
        tg.ready(); // Informe Telegram que l'app est prête
        
        // Gère le clic sur le bouton "Retour" natif de Telegram
        tg.BackButton.onClick(() => {
            window.history.back();
        });

        // Met à jour la visibilité du bouton "Retour"
        function updateTelegramBackButton() {
            if (location.hash === '' || location.hash === '#home') {
                tg.BackButton.hide();
            } else {
                tg.BackButton.show();
            }
        }
    } catch (e) {
        console.error("L'API Telegram n'est pas disponible.", e);
    }
    
    // --- FONCTIONS DE RENDU ---

    /** Affiche la page d'accueil avec les catégories */
    function renderHome() {
        header.classList.remove('header-hidden');
        let html = '<div class="grid">';
        for (const category of data.categories) {
            html += `
                <a href="#category/${category.id}" class="card">
                    <img src="${category.image}" alt="${category.name}">
                    <div class="card-name">${category.name}</div>
                </a>
            `;
        }
        html += '</div>';
        app.innerHTML = html;
    }

    /** Affiche la page d'une catégorie avec ses produits */
    function renderCategory(categoryId) {
        header.classList.remove('header-hidden');
        const products = data.products.filter(p => p.categoryId === categoryId);
        
        if (products.length === 0) {
            app.innerHTML = `<p>Aucun produit dans cette catégorie.</p>`;
            return;
        }

        let html = '<div class="grid">';
        for (const product of products) {
            html += `
                <a href="#product/${product.id}" class="card">
                    <img src="${product.thumbnail}" alt="${product.name}" class="video-thumbnail">
                    <div class="card-name">${product.name}</div>
                </a>
            `;
        }
        html += '</div>';
        app.innerHTML = html;
    }

    /** Affiche la page de détail d'un produit */
    function renderProduct(productId) {
        header.classList.add('header-hidden');
        const product = data.products.find(p => p.id === productId);

        if (!product) {
            app.innerHTML = `<p>Produit non trouvé.</p>`;
            return;
        }

        // Génère la liste des terpènes et des prix
        const terpenesList = product.terpenes.map(t => `<li>${t}</li>`).join('');
        const pricesList = product.prices.map(p => `<li>${p.weight} – ${p.price}</li>`).join('');

        app.innerHTML = `
            <div class="product-view">
                <video class="product-video" src="${product.video}" controls autoplay muted loop playsinline></video>
                <div class="product-details">
                    <h1>${product.name}</h1>
                    <div class="detail-item">
                        <strong>Farm:</strong> ${product.farm}
                    </div>
                    <div class="detail-item">
                        <strong>Goût:</strong> ${product.taste}
                    </div>
                    <div class="detail-item">
                        <strong>Terpènes:</strong>
                        <ul>${terpenesList}</ul>
                    </div>
                    <div class="detail-item">
                        <strong>Prix:</strong>
                        <ul>${pricesList}</ul>
                    </div>
                </div>
            </div>
        `;
    }

    // --- ROUTEUR ---
    function router() {
        const hash = location.hash;
        
        if (hash.startsWith('#category/')) {
            const categoryId = parseInt(hash.split('/')[1]);
            renderCategory(categoryId);
        } else if (hash.startsWith('#product/')) {
            const productId = parseInt(hash.split('/')[1]);
            renderProduct(productId);
        } else {
            renderHome();
        }

        // Met à jour le bouton Telegram à chaque changement de page
        if (window.Telegram.WebApp) {
            updateTelegramBackButton();
        }
    }

    // --- ÉCOUTEURS D'ÉVÉNEMENTS ---
    window.addEventListener('hashchange', router);
    
    // Lancement initial de l'application
    router();
});
