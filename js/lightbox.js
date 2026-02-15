/**
 * Lightbox Gallery Viewer
 * - Click any gallery image to open fullscreen
 * - Scroll / swipe through all images
 * - Close with X button, Escape key, or clicking the backdrop
 * - Keyboard arrow navigation
 * - Touch swipe support for mobile
 */

(function () {
    'use strict';

    // Collect all gallery images
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (!galleryItems.length) return;

    const images = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt || 'Gallery image'
    }));

    let currentIndex = 0;
    let lightboxEl = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // ── Build Lightbox DOM ──────────────────────────────────────
    function createLightbox() {
        const overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.innerHTML = `
      <div class="lightbox-backdrop"></div>

      <!-- UI Overlay Layer -->
      <div class="lightbox-ui">
          <!-- Close Button - Top Right -->
          <button class="lightbox-close" aria-label="Close lightbox">
            <span class="material-symbols-outlined">close</span>
          </button>

          <!-- Counter - Top Center -->
          <div class="lightbox-counter">
            <span class="lightbox-current">1</span> <span class="divider">/</span> <span class="lightbox-total">${images.length}</span>
          </div>

          <!-- Navigation Arrows -->
          <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="lightbox-nav lightbox-next" aria-label="Next image">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
      </div>

      <!-- Main Image Strip (The Scrollable Container) -->
      <div class="lightbox-viewport">
          <div class="lightbox-strip">
            ${images.map((img, i) => `
              <div class="lightbox-slide" data-index="${i}">
                <div class="image-wrapper">
                    <img src="${img.src}" alt="${img.alt}" draggable="false" />
                </div>
              </div>
            `).join('')}
          </div>
      </div>

      <!-- Thumbnail Strip - Bottom -->
      <div class="lightbox-thumbs-container">
          <div class="lightbox-thumbs">
            ${images.map((img, i) => `
              <button class="lightbox-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
                <img src="${img.src}" alt="${img.alt}" />
              </button>
            `).join('')}
          </div>
      </div>
    `;

        document.body.appendChild(overlay);
        lightboxEl = overlay;

        // ── Event Listeners ──────────────────────────────────────
        // Close button
        overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

        // Backdrop click
        overlay.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

        // Nav arrows
        overlay.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            navigate(-1);
        });
        overlay.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            navigate(1);
        });

        // Thumbnail clicks
        overlay.querySelectorAll('.lightbox-thumb').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(parseInt(thumb.dataset.index));
            });
        });

        // Touch / Swipe
        const strip = overlay.querySelector('.lightbox-strip');
        strip.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        strip.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        // Mouse wheel scroll support
        const viewport = overlay.querySelector('.lightbox-viewport');
        viewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaX > 20 || e.deltaY > 20) navigate(1);
            else if (e.deltaX < -20 || e.deltaY < -20) navigate(-1);
        }, { passive: false });

        // Keyboard
        document.addEventListener('keydown', handleKeydown);
    }

    // ── Helper: Get Scrollbar Width ─────────────────────────────
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    // ── Open ────────────────────────────────────────────────────
    function openLightbox(index) {
        currentIndex = index;
        if (!lightboxEl) createLightbox();

        const scrollbarWidth = getScrollbarWidth();
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        lightboxEl.classList.add('active');
        document.body.style.overflow = 'hidden';

        goToSlide(index, false);
    }

    // ── Close ───────────────────────────────────────────────────
    function closeLightbox() {
        if (!lightboxEl) return;
        lightboxEl.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    // ── Navigate ────────────────────────────────────────────────
    function navigate(direction) {
        let next = currentIndex + direction;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;
        goToSlide(next);
    }

    function goToSlide(index, animate = true) {
        currentIndex = index;

        const strip = lightboxEl.querySelector('.lightbox-strip');
        const slideWidth = 100; // 100vw

        strip.style.transition = animate ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
        strip.style.transform = `translateX(-${currentIndex * slideWidth}vw)`;

        // Update UI
        updateUI();
    }

    function updateUI() {
        if (!lightboxEl) return;

        // Update counter
        lightboxEl.querySelector('.lightbox-current').textContent = currentIndex + 1;

        // Update thumbnails
        lightboxEl.querySelectorAll('.lightbox-thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });

        // Scroll active thumbnail into view
        const activeThumb = lightboxEl.querySelector('.lightbox-thumb.active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        // Handle arrow visibility
        lightboxEl.querySelector('.lightbox-prev').style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        lightboxEl.querySelector('.lightbox-next').style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
    }

    // ── Swipe Handler ───────────────────────────────────────────
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) navigate(1);   // Swipe left → next
            else navigate(-1);            // Swipe right → prev
        }
    }

    // ── Keyboard Handler ────────────────────────────────────────
    function handleKeydown(e) {
        if (!lightboxEl || !lightboxEl.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    }

    // ── Attach Click Handlers to Gallery Items ──────────────────
    galleryItems.forEach((img, index) => {
        // Make the parent gallery-item clickable
        const item = img.closest('.gallery-item');
        if (item) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => openLightbox(index));
        }
    });

})();
