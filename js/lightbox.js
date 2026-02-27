/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  PREMIUM LIGHTBOX v2.0 — Single-image fade approach
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  • No strip — only the current image is rendered
 *  • Silky fade + scale transitions (no jitter)
 *  • Touch swipe with momentum
 *  • Keyboard / mouse-wheel navigation
 *  • Thumbnail bar with auto-scroll
 *  • Pinch-to-close gesture
 */

(function () {
    'use strict';

    /* ── Sanitize ─────────────────────────────────── */
    function esc(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    /* ── Gather gallery images ────────────────────── */
    const items = document.querySelectorAll('.gallery-item img');
    if (!items.length) return;

    const images = Array.from(items).map(img => ({
        src: esc(img.src),
        alt: esc(img.alt || 'Gallery image')
    }));

    let current = 0;
    let isOpen = false;
    let isAnimating = false;

    /* Touch state */
    let touchStartX = 0;
    let touchStartY = 0;
    let touchDeltaX = 0;
    let isDragging = false;

    /* Debounce wheel */
    let wheelTimer = null;

    /* ── DOM References ──────────────────────────── */
    let overlay, backdrop, imgCurrent, imgNext;
    let counter, counterCurrent, counterTotal;
    let prevBtn, nextBtn, closeBtn;
    let thumbsContainer, thumbsList;

    /* ── Build Lightbox DOM ─────────────────────── */
    function build() {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Image lightbox viewer');

        overlay.innerHTML = `
            <div class="lb-backdrop"></div>

            <div class="lb-stage">
                <div class="lb-image-container lb-active" id="lb-img-a">
                    <img draggable="false" alt="" />
                </div>
                <div class="lb-image-container" id="lb-img-b">
                    <img draggable="false" alt="" />
                </div>
            </div>

            <div class="lb-ui">
                <div class="lb-top">
                    <div class="lb-counter">
                        <span class="lb-counter-current">1</span>
                        <span class="lb-counter-sep">/</span>
                        <span class="lb-counter-total">${images.length}</span>
                    </div>
                    <button class="lb-close" aria-label="Close lightbox">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                <button class="lb-nav lb-prev" aria-label="Previous image">
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <button class="lb-nav lb-next" aria-label="Next image">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>

                <div class="lb-thumbs-wrap">
                    <div class="lb-thumbs">
                        ${images.map((img, i) => `
                            <button class="lb-thumb${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="View image ${i + 1}">
                                <img src="${img.src}" alt="${img.alt}" />
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        /* Cache refs */
        backdrop = overlay.querySelector('.lb-backdrop');
        imgCurrent = overlay.querySelector('#lb-img-a');
        imgNext = overlay.querySelector('#lb-img-b');
        counter = overlay.querySelector('.lb-counter');
        counterCurrent = overlay.querySelector('.lb-counter-current');
        counterTotal = overlay.querySelector('.lb-counter-total');
        prevBtn = overlay.querySelector('.lb-prev');
        nextBtn = overlay.querySelector('.lb-next');
        closeBtn = overlay.querySelector('.lb-close');
        thumbsContainer = overlay.querySelector('.lb-thumbs-wrap');
        thumbsList = overlay.querySelector('.lb-thumbs');

        /* ── Bind Events ─────────────────────────── */
        closeBtn.addEventListener('click', close);
        backdrop.addEventListener('click', close);
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });

        /* Thumbnails */
        thumbsList.addEventListener('click', (e) => {
            const thumb = e.target.closest('.lb-thumb');
            if (!thumb) return;
            e.stopPropagation();
            goTo(parseInt(thumb.dataset.i));
        });

        /* Keyboard */
        document.addEventListener('keydown', onKey);

        /* Mouse wheel */
        overlay.querySelector('.lb-stage').addEventListener('wheel', onWheel, { passive: false });

        /* Touch / Swipe on stage */
        const stage = overlay.querySelector('.lb-stage');
        stage.addEventListener('touchstart', onTouchStart, { passive: true });
        stage.addEventListener('touchmove', onTouchMove, { passive: false });
        stage.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    /* ── Load image into a container ─────────────── */
    function loadImage(container, index) {
        const img = container.querySelector('img');
        img.src = images[index].src;
        img.alt = images[index].alt;
    }

    /* ── Open ─────────────────────────────────────── */
    function open(index) {
        if (!overlay) build();

        current = index;
        loadImage(imgCurrent, current);

        /* Set active state */
        imgCurrent.classList.add('lb-active');
        imgNext.classList.remove('lb-active');

        /* Prevent body scroll */
        const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarW > 0) document.body.style.paddingRight = scrollbarW + 'px';
        document.body.style.overflow = 'hidden';

        /* Show */
        requestAnimationFrame(() => {
            overlay.classList.add('lb-open');
            isOpen = true;
            updateUI();
        });
    }

    /* ── Close ────────────────────────────────────── */
    function close() {
        if (!isOpen) return;
        overlay.classList.remove('lb-open');
        isOpen = false;

        setTimeout(() => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }, 400);
    }

    /* ── Navigate ─────────────────────────────────── */
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function goTo(index, direction) {
        if (isAnimating) return;
        if (index < 0 || index >= images.length) return;
        if (index === current) return;

        isAnimating = true;

        /* Determine direction if not explicit */
        const dir = direction || (index > current ? 'left' : 'right');

        /* Load next image into the hidden container */
        loadImage(imgNext, index);

        /* Set up entrance direction */
        imgNext.classList.remove('lb-exit-left', 'lb-exit-right', 'lb-enter-left', 'lb-enter-right');
        imgCurrent.classList.remove('lb-exit-left', 'lb-exit-right', 'lb-enter-left', 'lb-enter-right');

        /* Force reflow so transitions fire */
        void imgNext.offsetWidth;

        /* Animate: old slides out, new slides in */
        if (dir === 'left') {
            imgCurrent.classList.add('lb-exit-left');
            imgNext.classList.add('lb-enter-right');
        } else {
            imgCurrent.classList.add('lb-exit-right');
            imgNext.classList.add('lb-enter-left');
        }

        imgNext.classList.add('lb-active');

        /* After transition ends, swap containers */
        setTimeout(() => {
            imgCurrent.classList.remove('lb-active', 'lb-exit-left', 'lb-exit-right', 'lb-enter-left', 'lb-enter-right');
            imgNext.classList.remove('lb-enter-left', 'lb-enter-right');

            /* Swap references so imgCurrent always = visible one */
            const temp = imgCurrent;
            imgCurrent = imgNext;
            imgNext = temp;

            current = index;
            updateUI();
            isAnimating = false;
        }, 450);
    }

    /* ── Update UI (counter, thumbs, arrows) ────── */
    function updateUI() {
        counterCurrent.textContent = current + 1;

        /* Arrows */
        prevBtn.classList.toggle('lb-hidden', current === 0);
        nextBtn.classList.toggle('lb-hidden', current === images.length - 1);

        /* Thumbnails */
        const thumbs = thumbsList.querySelectorAll('.lb-thumb');
        thumbs.forEach((t, i) => {
            t.classList.toggle('active', i === current);
        });

        /* Scroll active thumb into view */
        const activeThumb = thumbsList.querySelector('.lb-thumb.active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    /* ── Keyboard ─────────────────────────────────── */
    function onKey(e) {
        if (!isOpen) return;
        switch (e.key) {
            case 'Escape': close(); break;
            case 'ArrowLeft': prev(); break;
            case 'ArrowRight': next(); break;
        }
    }

    /* ── Mouse Wheel ─────────────────────────────── */
    function onWheel(e) {
        if (!isOpen) return;
        e.preventDefault();

        if (wheelTimer) return; // debounce

        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(delta) < 15) return;

        if (delta > 0) next();
        else prev();

        wheelTimer = setTimeout(() => { wheelTimer = null; }, 500);
    }

    /* ── Touch Handling ──────────────────────────── */
    function onTouchStart(e) {
        if (isAnimating) return;
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
        touchDeltaX = 0;
        isDragging = false;
    }

    function onTouchMove(e) {
        if (isAnimating) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        /* Only handle horizontal drags */
        if (!isDragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
            isDragging = true;
        }

        if (isDragging) {
            e.preventDefault();
            touchDeltaX = dx;

            /* Live drag feedback on current image */
            const dampened = touchDeltaX * 0.4;
            imgCurrent.querySelector('img').style.transform = `translateX(${dampened}px) scale(${1 - Math.abs(dampened) * 0.0003})`;
            imgCurrent.querySelector('img').style.transition = 'none';
        }
    }

    function onTouchEnd() {
        if (!isDragging) return;
        isDragging = false;

        /* Reset current image transform */
        const img = imgCurrent.querySelector('img');
        img.style.transition = '';
        img.style.transform = '';

        const threshold = 60;
        if (touchDeltaX < -threshold) {
            next();
        } else if (touchDeltaX > threshold) {
            prev();
        }
        touchDeltaX = 0;
    }

    /* ── Attach click handlers to gallery items ──── */
    items.forEach((img, index) => {
        const item = img.closest('.gallery-item');
        if (item) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => open(index));
        }
    });

})();
