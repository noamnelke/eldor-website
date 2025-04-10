// This file handles the language toggle functionality and dynamically updates the content based on the selected language.

document.addEventListener('DOMContentLoaded', function() {
    const contentElements = document.querySelectorAll('[data-i18n]');

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

        if (!currentSectionId) return;

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
});