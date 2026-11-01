/**
 * PORTFOLIO NGUYỄN VĂN VƯỢNG - TRƯỞNG PHÒNG MARKETING (SME)
 * Interactive Script: Tab Switcher, Gallery Filter, Lightbox, Image Fallback & ScrollSpy
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show');
            const icon = mobileToggle.querySelector('span');
            if (icon) {
                icon.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const icon = mobileToggle.querySelector('span');
                if (icon) icon.textContent = '☰';
            });
        });
    }

    // 2. SCROLLSPY - ACTIVE NAVBAR LINK
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // Check if reached bottom of page -> activate contact
        if (scrollY + windowHeight >= docHeight - 60) {
            current = 'lien-he';
        } else {
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 120;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. BUDGET & KPI TABS SWITCHER
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Budget Sub-model Toggle (B2B vs B2C)
    const btnModelB2B = document.getElementById('btnModelB2B');
    const btnModelB2C = document.getElementById('btnModelB2C');
    const modelB2BTable = document.getElementById('modelB2BTable');
    const modelB2CTable = document.getElementById('modelB2CTable');

    if (btnModelB2B && btnModelB2C && modelB2BTable && modelB2CTable) {
        btnModelB2B.addEventListener('click', function () {
            btnModelB2B.classList.add('active');
            btnModelB2C.classList.remove('active');
            modelB2BTable.style.display = 'block';
            modelB2CTable.style.display = 'none';
        });

        btnModelB2C.addEventListener('click', function () {
            btnModelB2C.classList.add('active');
            btnModelB2B.classList.remove('active');
            modelB2BTable.style.display = 'none';
            modelB2CTable.style.display = 'block';
        });
    }

    // 4. GALLERY FILTER (Scoped strictly to .gallery-filters so budget toggle buttons never conflict)
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

        // 3.5. PROJECT CATEGORY FILTER
    const projFilterBtns = document.querySelectorAll('.project-filters .proj-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (projFilterBtns.length > 0 && projectCards.length > 0) {
        projFilterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                projFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

// 5. LIGHTBOX MODAL
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(src) {
        if (lightboxModal && lightboxImg && src) {
            lightboxImg.src = src;
            lightboxModal.classList.add('active');
        }
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', function (e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Attach click event to all zoomable images
    document.querySelectorAll('.zoomable-img').forEach(img => {
        img.addEventListener('click', function () {
            openLightbox(this.src);
        });
    });

    // 6. IMAGE FALLBACK HANDLER
    // If external evidence screenshot file doesn't exist yet, show clean built-in mockup
    document.querySelectorAll('img[data-fallback]').forEach(img => {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            const fallbackId = this.getAttribute('data-fallback');
            const fallbackEl = document.getElementById(fallbackId);
            if (fallbackEl) {
                fallbackEl.style.display = 'block';
            }
        });
    });
});
