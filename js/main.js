

document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');

    if (hamburger && drawer) {
        hamburger.addEventListener('click', function () {
            drawer.classList.toggle('open');
            const isOpen = drawer.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            hamburger.textContent = isOpen ? '' : '';
        });

        drawer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                drawer.classList.remove('open');
                hamburger.textContent = '';
            });
        });

        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
                drawer.classList.remove('open');
                hamburger.textContent = '';
            }
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"], .mobile-drawer a[href^="#"]');

    if (sections.length && navLinks.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active-link');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        }, { rootMargin: '-60px 0px -70% 0px', threshold: 0 });

        sections.forEach(function (sec) { observer.observe(sec); });
    }

    const revealEls = document.querySelectorAll('.info-card, .obj-card, .ref-card, .member-card, .topic-item');
    if ('IntersectionObserver' in window && revealEls.length) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealEls.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transition = 'opacity .45s ease, transform .45s ease';
            revealObserver.observe(el);
        });
    }

    const style = document.createElement('style');
    style.textContent = '.active-link { color: var(--accent) !important; background: var(--accent-light) !important; border-radius: 8px; }';
    document.head.appendChild(style);
});
