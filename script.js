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
                        top: targetElement.offsetTop - 80,
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
    }
})

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
