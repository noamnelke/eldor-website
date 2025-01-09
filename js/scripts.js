// This file handles the language toggle functionality and dynamically updates the content based on the selected language.

document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const contentElements = document.querySelectorAll('[data-i18n]');

    languageToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'he' ? 'en' : 'he';
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
        updateContent(newLang);
    });

    function updateContent(lang) {
        fetch(`./i18n/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                contentElements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    element.textContent = translations[key] || key;
                });
            });
    }

    function updateMainMargin() {
        const headerHeight = document.querySelector('header').offsetHeight - 1;
        document.querySelector('main').style.marginTop = `${headerHeight}px`;
    }

    window.addEventListener('resize', updateMainMargin);
    setTimeout(updateMainMargin, 0); // Call after the event loop to ensure the header height is calculated

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
  
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
  
          if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight - 1;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight;
  
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth', // Optional: smooth scrolling
            });
          }
        });
      });  

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('nav a');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
});