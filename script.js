function showDemoAlert() {
    alert('Ce site est une démonstration! La boutique Kingsmen n\'existe pas. Merci de votre visite');
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
   
    const menuButton = document.getElementById('menu-button');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu-container');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a')

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            // Vérifier que targetId n'est pas simplement "#"
            if (targetId !== "#") {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 57,
                        behavior: 'smooth'
                    });

                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    const globalCarouselControl = document.getElementById('global-carousel-control');
    const allCarousels = document.querySelectorAll('.carousel');
    let carouselsArePaused = false;

    if (globalCarouselControl) {
        globalCarouselControl.addEventListener('click', function() {
            const controlText = this.querySelector('.control-text');
            const controlIcon = this.querySelector('.control-icon');
            
            if (carouselsArePaused) {
            // Reprendre le défilement
                allCarousels.forEach(carousel => {
                carousel.classList.remove('carousel-paused');
                });
                
                controlText.textContent = 'Arrêter le défilement';
                controlIcon.textContent = '⏸';
                carouselsArePaused = false;
            } else {
                // Arrêter le défilement
                allCarousels.forEach(carousel => {
                carousel.classList.add('carousel-paused');
                });
                
                controlText.textContent = 'Reprendre le défilement';
                controlIcon.textContent = '▶';
                    carouselsArePaused = true;
            }
        });
    };

      // Initialisation de la carte OpenStreetMap
  window.addEventListener('load', function() {
    // Vérifier si l'élément de carte existe
    const mapElement = document.getElementById('openstreetmap');
    if (!mapElement) return;
    
    // Coordonnées du 1 la canebière
    const shopLat = 43.29561;
    const shopLng = 5.37454;
    
    // Forcer un délai pour s'assurer que le conteneur de la carte est bien rendu
    setTimeout(function() {
      // Vérifier si la carte existe déjà
      if (window.myMap) {
        window.myMap.remove();
      }
      
      // Initialiser la carte avec scrollWheelZoom désactivé par défaut
      const map = L.map('openstreetmap', {
        scrollWheelZoom: false, // Désactive le zoom par défaut avec la molette
        center: [shopLat, shopLng],
        zoom: 16,
        attributionControl: true
      });
      
      // Stocker la référence de la carte dans une variable globale
      window.myMap = map;
      
      // Activer le scrollWheelZoom uniquement lorsque la carte a le focus
      map.on('focus', function() {
        map.scrollWheelZoom.enable();
      });
      
      // Désactiver le scrollWheelZoom lorsque la carte perd le focus
      map.on('blur', function() {
        map.scrollWheelZoom.disable();
      });
      
      // Ajouter la couche OpenStreetMap
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);
      
      // Ajouter un marqueur pour la boutique
      const marker = L.marker([shopLat, shopLng]).addTo(map);
      
      // Créer une popup avec des options personnalisées pour l'accessibilité
      const popupOptions = {
        closeButton: true,
        closeOnClick: false,
        className: 'accessible-popup',
        maxWidth: 300,
        minWidth: 200,
        autoPan: true,
        offset: [0, -5] // Ajuster le décalage pour centrer la popup
      };
      
      // Ajouter la popup avec les options personnalisées
      marker.bindPopup('<div class="popup-content"><b>Boutique Kingsmen</b><br>1 La Canebière, 13001 Marseille</div>', popupOptions).openPopup();
      
      // S'assurer que la carte est correctement dimensionnée
      map.invalidateSize();
      
      // Remplacer le lien par un bouton pour éviter les liens morts
      setTimeout(function() {
        const closeButtons = document.querySelectorAll('.leaflet-popup-close-button');
        closeButtons.forEach(function(closeButton) {
          // Remplacer l'attribut href par javascript:void(0)
          closeButton.setAttribute('href', 'javascript:void(0);');
          closeButton.setAttribute('role', 'button');
          closeButton.setAttribute('aria-label', 'Fermer la carte');
          
          
        });
      }, 300); // Délai plus long pour s'assurer que la popup est rendue
    }, 500); // Délai pour s'assurer que le conteneur est bien rendu
  });
});

// Gestion du bouton "Voir toutes nos collections"
  const collectionsButton = document.querySelector('.collection-footer .btn-primary');
  if (collectionsButton) {
    collectionsButton.addEventListener('click', function(e) {
      e.preventDefault();
      showDemoAlert();
    });}

// Gestion de la taille de la Scrollbar pour le diaporama
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);