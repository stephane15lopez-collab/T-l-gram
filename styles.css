document.addEventListener('DOMContentLoaded', () => {

    // AJOUTÉ : Le nom d'utilisateur de votre contact Telegram (sans le @)
    const TELEGRAM_CONTACT = "fernandonewdrop";

    // --- DONNÉES DE L'APPLICATION ---
    const data = {
        categories: [
            { id: 1, name: "Hash", image: "assets/categories/hash.png" },
            { id: 2, name: "Weed", image: "assets/categories/weed.png" },
            { id: 3, name: "Neige", image: "assets/categories/neige.png" },
            { id: 4, name: "Extazy", image: "assets/categories/extazy.png" },
            { id: 5, name: "Promotions", image: "assets/categories/promotions.png" },
            { id: 6, name: "Revendeur", image: "assets/categories/Revendeur.png" },
        ],
        products: [
            // --- WEED ---
            {
                id: 102, categoryId: 2, name: "Purple Haze",
                video: "assets/videos/purplehaze.mp4", thumbnail: "assets/thumbnails/purplehaze.jpg",
                farm: "Green Valley",
                taste: "Baies sucrées, terreux, épicé",
                terpenes: ["Myrcène", "Caryophyllène"],
                prices: [{ weight: "3g", price: "45€" }, { weight: "5g", price: "70€" }]
            },
            {
                id: 104, categoryId: 2, name: "Lemon Zlushi",
                video: "assets/videos/lemon_zlushi.mp4", thumbnail: "assets/thumbnails/lemon_zlushi.jpg",
                farm: "Cookies Farm",
                taste: "Gazeux, Poivré, Abricot, Terreux",
                terpenes: ["Caryophyllène", "Limonène", "Humulène"],
                prices: [{ weight: "5g", price: "80€" }, { weight: "10g", price: "140€" }]
            },
            {
                id: 103, categoryId: 2, name: "Amnesia Haze",
                video: "assets/videos/amnesia_haze.mp4",thumbnail: "assets/thumbnails/amnesia_haze.jpg",
                farm: "Dutch Passion",
                taste: "Agrumes, Citron, Terreux",
                terpenes: ["Limonène", "Myrcène"],
                prices: [{ weight: "5g", price: "70€" },{ weight: "10g", price: "120€" }]
            },
            // --- HASH ---
            { 
                id: 201, categoryId: 1, name: "Royal Hash",
                video: "assets/videos/royalhash.mp4", thumbnail: "assets/thumbnails/royalhash.jpg",
                farm: "Desert Kings",
                type: "Jaune Mousseux",
                taste: "Épicé, pin, terreux",
                terpenes: ["Pinène", "Humulène"],
                prices: [{ weight: "2g", price: "30€" }, { weight: "5g", price: "65€" }] 
            },
            { 
                id: 202, categoryId: 1, name: "Afghan Gold",
                video: "assets/videos/afghangold.mp4", thumbnail: "assets/thumbnails/afghangold.jpg",
                farm: "Hindu Kush Masters",
                type: "Filtré x3",
                taste: "Boisé, floral, sucré",
                terpenes: ["Linalol", "Myrcène"],
                prices: [{ weight: "2g", price: "35€" }, { weight: "5g", price: "75€" }] 
            },
            { 
                id: 203, categoryId: 1, name: "Gary Payton🏀",
                video: "assets/videos/gary_payton.mp4", thumbnail: "assets/thumbnails/gary_payton.jpg",
                farm: "Frosty Hash",
                type: "WPFF",
                taste: "Épicé, pin, terreux",
                terpenes: ["Pinène", "Humulène"],
                prices: [{ weight: "0,5g", price: "50€" }, { weight: "1g", price: "80€" }, { weight: "3g", price: "200€" }] 
            },
            // --- AUTRES PRODUITS ---
            {
                id: 301, categoryId: 3, name: "Flocon Pur",
                video: "assets/videos/flocon.mp4", thumbnail: "assets/thumbnails/flocon.jpg",
                farm: "Alps Lab",
                taste: "Neutre",
                terpenes: ["Haute pureté"],
                prices: [{ weight: "1g", price: "80€" }]
            },
            {
                id: 401, categoryId: 4, name: "MDMA Pills",
                video: "assets/videos/pills.mp4", thumbnail: "assets/thumbnails/pills.jpg",
                farm: "Party Time Inc.",
                taste: "Amère",
                terpenes: ["N/A"],
                prices: [{ weight: "1 pc", price: "10€" }, { weight: "5 pcs", price: "40€" }]
            },
            {
                id: 501, categoryId: 5, name: "PROMO: Pack Découverte",
                video: "assets/videos/pack.mp4", thumbnail: "assets/thumbnails/pack.jpg",
                farm: "Multi-Farms",
                taste: "Mixte",
                terpenes: ["Variés"],
                prices: [{ weight: "Pack", price: "150€" }]
            },
            {
                id: 601, categoryId: 6, name: "Kit du Revendeur",
                video: "assets/videos/kit.mp4", thumbnail: "assets/thumbnails/kit.jpg",
                farm: "WorkHard Co.",
                taste: "Énergisant",
                terpenes: ["Focus"],
                prices: [{ weight: "Kit complet", price: "200€" }]
            },
        ]
    };

    const app = document.getElementById('app');
    const header = document.getElementById('app-header');

    try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.BackButton.onClick(() => { window.history.back(); });
        function updateTelegramBackButton() {
            if (location.hash === '' || location.hash === '#home') {
                tg.BackButton.hide();
            } else {
                tg.BackButton.show();
            }
        }
    } catch (e) { console.error("L'API Telegram n'est pas disponible.", e); }
    
    function renderHome() {
        header.classList.remove('header-hidden');
        let html = '<div class="grid">';
        data.categories.forEach(category => {
            html += `
                <a href="#category/${category.id}" class="card">
                    <img src="${category.image}" alt="${category.name}">
                    <div class="card-name">${category.name}</div>
                </a>
            `;
        });
        html += '</div>';
        app.innerHTML = html;
    }

    function renderCategory(categoryId) {
        header.classList.remove('header-hidden');
        const products = data.products.filter(p => p.categoryId === categoryId);
        
        if (products.length === 0) {
            app.innerHTML = `<p style="text-align: center; padding-top: 2rem;">Aucun produit dans cette catégorie pour le moment.</p>`;
            return;
        }

        let html = '<div class="grid">';
        products.forEach(product => {
            html += `
                <a href="#product/${product.id}" class="card">
                    <img src="${product.thumbnail}" alt="${product.name}" class="video-thumbnail">
                    <div class="card-name">${product.name}</div>
                </a>
            `;
        });
        html += '</div>';
        app.innerHTML = html;
    }
    
    function renderProduct(productId) {
        header.classList.add('header-hidden');
        const product = data.products.find(p => p.id === productId);
        const terpenesList = product.terpenes.map(t => `<li>${t}</li>`).join('');
        const pricesList = product.prices.map(p => `<li>${p.weight} – ${p.price}</li>`).join('');

        let typeHtml = '';
        if (product.type) {
            typeHtml = `
                <div class="detail-item">
                    <strong>Type:</strong> ${product.type}
                </div>
            `;
        }

        app.innerHTML = `
            <div class="product-view">
                <video class="product-video" src="${product.video}" controls autoplay muted loop playsinline></video>
                <div class="product-details">
                    <h1>${product.name}</h1>
                    <div class="detail-item"><strong>Farm:</strong> ${product.farm}</div>
                    ${typeHtml}
                    <div class="detail-item"><strong>Goût:</strong> ${product.taste}</div>
                    <div class="detail-item"><strong>Infos:</strong><ul>${terpenesList}</ul></div>
                    <div class="detail-item"><strong>Prix:</strong><ul>${pricesList}</ul></div>

                    <a href="https://t.me/${TELEGRAM_CONTACT}" target="_blank" class="order-button">
                        Commander sur Telegram 🚀
                    </a>
                </div>
            </div>`;
    }

    function router() {
        app.classList.add('fade-out');
        setTimeout(() => {
            const hash = location.hash;
            
            if (hash.startsWith('#category/')) {
                renderCategory(parseInt(hash.split('/')[1]));
            } else if (hash.startsWith('#product/')) {
                renderProduct(parseInt(hash.split('/')[1]));
            } else {
                renderHome();
            }

            app.classList.remove('fade-out');
            window.scrollTo(0, 0);

            if (window.Telegram.WebApp) {
                updateTelegramBackButton();
            }
        }, 150);
    }
    
    window.addEventListener('hashchange', router);
    const initialHash = location.hash;
    location.hash = ''; 
    location.hash = initialHash || '#home';
    if (!initialHash) {
        router();
    }
});
