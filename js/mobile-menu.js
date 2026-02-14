/**
 * MOBILE NAVIGATION HANDLER
 * Handles mobile menu toggle functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    const menuButtons = document.querySelectorAll('[data-mobile-menu-button]'); // Get ALL buttons
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const menuIcons = document.querySelectorAll('[data-menu-icon]');

    if (menuButtons.length > 0 && mobileMenu) {
        // Add click event to all menu buttons (hamburger and close)
        menuButtons.forEach(button => {
            button.addEventListener('click', function () {
                const isOpen = mobileMenu.classList.contains('hidden');

                if (isOpen) {
                    // Open menu
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('flex');
                    menuIcons.forEach(icon => icon.textContent = 'close');
                    document.body.style.overflow = 'hidden';
                } else {
                    // Close menu
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    menuIcons.forEach(icon => icon.textContent = 'menu');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                menuIcons.forEach(icon => icon.textContent = 'menu');
                document.body.style.overflow = '';
            });
        });
    }
});
