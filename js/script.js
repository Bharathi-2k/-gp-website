/* GP Anikalan Script handled via Central Config */

const SHOP_CONFIG = {
    shopName: "GP Anikalan",
    whatsappURL: "https://chat.whatsapp.com/FhPjlRLZIDN9J6DIHd7iGe?mode=gi_t",
    instagramURL: "https://www.instagram.com/gp_anikalan?stkn=MzFubXllZzNodXdk"
};

const CATEGORIES = [
    { title: "Premium Covering", desc: "Traditional and contemporary premium covering sets with 2-year warranty", img: "assets/images/gold.jpg", filter: "Premium" },
    { title: "Traditional Covering", desc: "Elegant classic covering pieces with 2-year warranty", img: "assets/images/diamond.jpg", filter: "Traditional" },
    { title: "Bridal Jewellery", desc: "Timeless sets for your special day (2-year warranty)", img: "assets/images/bridal.jpg", filter: "Bridal" },
    { title: "Necklaces", desc: "Elegant covering chains and heavy necklaces", img: "assets/images/necklace.jpg", filter: "Necklaces" },
    { title: "Earrings", desc: "Studs, drops and traditional covering jhumkas", img: "assets/images/earrings.jpg", filter: "Earrings" },
    { title: "Rings", desc: "Engagement and designer covering rings", img: "assets/images/rings_1791024827962.png", filter: "Rings" },
    { title: "Bangles", desc: "Classic and contemporary covering bangles", img: "assets/images/bangles.jpg", filter: "Bangles" }
];

const PRODUCTS = [
    { id: 1, name: "Classic Covering Necklace", category: "Premium", type: "Necklaces", code: "CN-001", img: "assets/images/gold.jpg", desc: "A beautifully intricate traditional Indian covering necklace crafted with exact precision. Includes a 2-year warranty." },
    { id: 2, name: "Traditional Bridal Necklace", category: "Bridal", type: "Necklaces", code: "BN-042", img: "assets/images/bridal.jpg", desc: "A heavy covering choker, perfect to complement your special day. Includes a 2-year warranty." },
    { id: 3, name: "Premium Engagement Ring", category: "Premium", type: "Rings", code: "CR-015", img: "assets/images/rings_1791024827962.png", desc: "A sparkling covering engagement ring with beautiful craftwork. Includes a 2-year warranty." },
    { id: 4, name: "Designer Covering Earrings", category: "Premium", type: "Earrings", code: "CE-089", img: "assets/images/earrings.jpg", desc: "Elegant designer covering earrings with detailed carvings. Includes a 2-year warranty." },
    { id: 5, name: "Ruby Studded Covering Bangles", category: "Premium", type: "Bangles", code: "CB-023", img: "assets/images/bangles.jpg", desc: "A stack of traditional bridal Indian covering bangles with intricate carvings. Includes a 2-year warranty." },
    { id: 6, name: "Minimalist Covering Chain", category: "Premium", type: "Necklaces", code: "CC-007", img: "assets/images/necklace.jpg", desc: "Simple yet elegant solitary covering chain for everyday wear. Includes a 2-year warranty." },
    { id: 7, name: "Traditional Bridal Earrings", category: "Bridal", type: "Earrings", code: "BE-102", img: "assets/images/diamond.jpg", desc: "Dazzling bridal covering earrings designed to make a statement. Includes a 2-year warranty." },
    { id: 8, name: "Elegant Covering Necklace", category: "Traditional", type: "Necklaces", code: "CN-055", img: "assets/images/diamond.jpg", desc: "A beautiful traditional covering necklace that shines elegantly. Includes a 2-year warranty." }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // Set Configured Links
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(SHOP_CONFIG.whatsappURL, '_blank');
        });
    });

    document.querySelectorAll('.instagram-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(SHOP_CONFIG.instagramURL, '_blank');
        });
    });

    // Mobile Menu
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuClose = document.getElementById('menuClose');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMenu();
        });
    });

    // Sticky Header & Scroll Spy
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll Reveal
        document.querySelectorAll('.reveal-up').forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    });

    // Render Categories
    const categoryContainer = document.getElementById('categoryContainer');
    if (categoryContainer) {
        CATEGORIES.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card reveal-up';
            card.innerHTML = `
                <div class="category-img-wrapper" onclick="filterByGlobal('${cat.filter}')">
                    <img src="${cat.img}" alt="${cat.title}" loading="lazy">
                </div>
                <div class="category-info">
                    <h3>${cat.title}</h3>
                    <p>${cat.desc}</p>
                    <button class="btn-text" onclick="filterByGlobal('${cat.filter}')">Explore</button>
                </div>
            `;
            categoryContainer.appendChild(card);
        });
    }

    // Render Products & Filtering
    const productContainer = document.getElementById('productContainer');
    const noResults = document.getElementById('noResults');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    let searchQuery = '';

    const renderProducts = () => {
        if (!productContainer) return;
        productContainer.innerHTML = '';
        
        const filtered = PRODUCTS.filter(p => {
            const matchFilter = currentFilter === 'all' || p.category === currentFilter || p.type === currentFilter;
            const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                p.type.toLowerCase().includes(searchQuery.toLowerCase());
            return matchFilter && matchSearch;
        });

        if (filtered.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
            filtered.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card reveal-up active'; // add active so it reveals immediately when filtered
                card.innerHTML = `
                    <div class="product-img">
                        <img src="${p.img}" alt="${p.name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <span class="product-cat">${p.category}</span>
                        <h3 class="product-name">${p.name}</h3>
                        <div class="product-price">Price on Request</div>
                        <div class="product-actions">
                            <button class="btn btn-outline" onclick="openModal(${p.id})">View Details</button>
                            <button class="btn btn-secondary whatsapp-btn"><i class="fab fa-whatsapp"></i> Order</button>
                        </div>
                    </div>
                `;
                productContainer.appendChild(card);
            });
            
            // Re-attach WhatsApp Listeners for dynamic elements
            productContainer.querySelectorAll('.whatsapp-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(SHOP_CONFIG.whatsappURL, '_blank');
                });
            });
        }
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Global Filter Access (for category clicks)
    window.filterByGlobal = function(filter) {
        document.getElementById('featured').scrollIntoView({behavior: 'smooth'});
        searchInput.value = '';
        searchQuery = '';
        
        filterBtns.forEach(b => {
            if(b.getAttribute('data-filter') === filter) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        currentFilter = filter;
        renderProducts();
    }

    // Initial Render
    renderProducts();

    // Modal Logic
    const modal = document.getElementById('productModal');
    const modalCloseBtn = document.getElementById('modalClose');
    const overlay = document.getElementById('modalOverlay');
    
    window.openModal = function(id) {
        const product = PRODUCTS.find(p => p.id === id);
        if(product && modal) {
            document.getElementById('modalImg').src = product.img;
            document.getElementById('modalImg').alt = product.name;
            document.getElementById('modalCategory').textContent = product.category;
            document.getElementById('modalTitle').textContent = product.name;
            document.getElementById('modalDesc').textContent = product.desc;
            document.getElementById('modalCode').textContent = "Product Code: " + product.code;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    const closeModal = () => {
        if(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if(overlay) overlay.addEventListener('click', closeModal);

    // Back to top
    const backToTopBtn = document.getElementById('scrollToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        // Initial setup for btn
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transition = 'var(--transition)';
        backToTopBtn.style.position = 'fixed'; // wait, it's inside footer but we need it clickable. fixed via css? No, css says it's inside footer-bottom, so it's not fixed in my css. I will just let it be a button in footer.
        backToTopBtn.style.position = 'static';
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    }

    // Trigger scroll event on load for visible elements
    window.dispatchEvent(new Event('scroll'));
});
