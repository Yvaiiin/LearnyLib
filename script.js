document.addEventListener('DOMContentLoaded', () => {
    // 0. FORCER LE RETOUR EN HAUT DE PAGE AU CHARGEMENT
    // Cela empêche le navigateur de descendre vers #symptoms au refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    // --------------------------
    // 1. GESTION DES ANIMATIONS D'APPARITION AU SCROLL (Intersection Observer)
    // Permet aux éléments d'apparaître doucement quand on scrolle vers eux.
    const observerOptions = {
        threshold: 0.15, // Déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px" // Un petit décalage pour que ça ne déclenche pas trop tôt en bas
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Cas spécifique : si c'est une barre de compétence, on lance le remplissage
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.fill');
                    const targetWidth = progressBar.getAttribute('data-width');
                    progressBar.style.width = targetWidth;
                }

                // On arrête d'observer l'élément une fois qu'il est animé (pour ne pas le rejouer)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Sélectionner tous les éléments qui doivent s'animer
    const revealElements = document.querySelectorAll('.fade-in, .reveal-up, .reveal-left, .reveal-right, .skill-item');
    revealElements.forEach(el => observer.observe(el));


    // 2. EFFET PARALLAXE SUBTIL SUR L'IMAGE (Hero Section)
    // L'image s'incline très légèrement quand on bouge la souris, pour un effet de profondeur.
    /*const heroSection = document.getElementById('hero');*/
    const image = document.getElementById('marketrylImage');

    // On vérifie si les éléments existent pour éviter des erreurs si on change le HTML
    if (heroSection && image) {
        heroSection.addEventListener('mousemove', (e) => {
            // Calculer la position de la souris par rapport au centre de la fenêtre
            // On divise par des grands nombres (35) pour que l'effet soit très subtil
            const x = (window.innerWidth / 2 - e.pageX) / 35;
            const y = (window.innerHeight / 2 - e.pageY) / 35;

            // Appliquer une légère rotation. 
            // Note : CSS continue de gérer le flottement vertical (translateY), 
            // JS ajoute juste une petite inclinaison par dessus.
            image.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        });

        // Reset de la position quand la souris quitte la zone pour éviter que l'image reste coincée
        heroSection.addEventListener('mouseleave', () => {
            image.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }
});