document.addEventListener('DOMContentLoaded', () => {
    
    // --- PERSONNALISATION ---
    const LIEN_VERS_CATALOGUE = "https://github.com/stephane15lopez-collab/T-l-gram/index.html"; 

    const PAGE_CONTACT_HTML = `
        <div class="content-page">
            <h1>Contact</h1>
            <p>Voici nos contacts :</p>
            <ul>
                <li>Telegram : @fernandonewdrop</li>
                <li>Autre lien...</li>
            </ul>
            <a href="#" class="back-button">← Retour</a>
        </div>
    `;

    const PAGE_INFOS_HTML = `
        <div class="content-page">
            <h1>Informations</h1>
            <p>Ici, vous pouvez mettre toutes les informations sur les livraisons, les paiements, etc.</p>
            <a href="#" class="back-button">← Retour</a>
        </div>
    `;

    const PAGE_CRYPTO_HTML = `
        <div class="content-page">
            <h1>Tuto Crypto</h1>
            <p>Ici, vous pouvez mettre votre tutoriel sur la crypto.</p>
            <a href="#" class="back-button">← Retour</a>
        </div>
    `;
    // --- FIN DE LA PERSONNALISATION ---


    const pageContent = document.getElementById('page-content');

    function renderHomePage() {
        pageContent.innerHTML = `
            <div class="button-list">
                <a href="#contact" class="portal-button">Contact 📞</a>
                <a href="#infos" class="portal-button">Informations ℹ️</a>
                <a href="${LIEN_VERS_CATALOGUE}" class="portal-button main-app-button">Ouvrir la Mini-App 📲</a>
                <a href="#crypto" class="portal-button">Tuto Crypto 📚</a>
            </div>
        `;
    }

    function renderPage(htmlContent) {
        pageContent.innerHTML = htmlContent;
    }

    function router() {
        const hash = window.location.hash;
        if (hash === '#contact') {
            renderPage(PAGE_CONTACT_HTML);
        } else if (hash === '#infos') {
            renderPage(PAGE_INFOS_HTML);
        } else if (hash === '#crypto') {
            renderPage(PAGE_CRYPTO_HTML);
        } else {
            renderHomePage();
        }
    }

    // Gère le rechargement de la page si l'utilisateur est déjà sur une sous-page
    window.addEventListener('popstate', router);
    // Gère la navigation
    router();

    // Configuration pour Telegram
    try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.setHeaderColor('#111315');
        tg.setBackgroundColor('#111315');
        // On n'a pas besoin du bouton retour natif ici
        tg.BackButton.hide();
    } catch (e) {
        console.error("API Telegram non disponible.");
    }
});