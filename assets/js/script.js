document.addEventListener('DOMContentLoaded', () => {
    // --- Language Handling ---
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('joralu_lang') || 'pt';

    // Initialize Language
    setLanguage(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    function setLanguage(lang) {
        // Update Active Button
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Save Preference
        localStorage.setItem('joralu_lang', lang);

        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let translation = translations[lang];

            keys.forEach(k => {
                if (translation) translation = translation[k];
            });

            if (translation) {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});
