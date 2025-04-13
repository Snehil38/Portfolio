document.addEventListener('DOMContentLoaded', () => {
    const typed = new Typed('.typing-text', {
        strings: [
            'I create digital experiences',
            'I turn ideas into reality',
            'I love what I do',
            'Let\'s build something amazing'
        ],
        typeSpeed: 40,
        backSpeed: 25,
        backDelay: 2500,
        loop: true,
        showCursor: false
    });
    
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            tabContents[index].classList.add('active');
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Theme toggle click counter
    const themeToggle = document.getElementById('theme-toggle');
    let clickCount = 0;
    
    themeToggle.addEventListener('click', () => {
        clickCount++;
        themeToggle.setAttribute('data-clicks', clickCount);
        
        if (clickCount === 5) {
            themeToggle.classList.add('secret-active');
            setTimeout(() => {
                themeToggle.classList.remove('secret-active');
            }, 2000);
        }
    });

    // Konami code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                const logo = document.getElementById('logo');
                logo.classList.add('konami-active');
                
                // Reset after animation
                setTimeout(() => {
                    logo.classList.remove('konami-active');
                    konamiIndex = 0;
                }, 3000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                document.querySelectorAll('.main-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });

    // Enhanced scroll spy for navigation
    const header = document.querySelector('.site-header');
    let scrollTimeout;
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        const sections = document.querySelectorAll('section[id], div[id]:not(.header-container)');
        let currentSection = null;
        let lastSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
            lastSection = section;
        });
        
        // If we're at the bottom of the page, use the last section
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            currentSection = lastSection;
        }
        
        if (currentSection) {
            const currentLink = document.querySelector(`.main-nav a[href="#${currentSection.id}"]`);
            if (currentLink) {
                document.querySelectorAll('.main-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                currentLink.classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', () => {
        // Clear previous timeout
        clearTimeout(scrollTimeout);
        
        // Update active section with debounce
        scrollTimeout = setTimeout(updateActiveSection, 100);
    });
    
    // Initial section check
    updateActiveSection();
    
    // Update active section on page load
    window.addEventListener('load', updateActiveSection);
    
    // Update active section when all images are loaded
    window.addEventListener('load', () => {
        const images = document.getElementsByTagName('img');
        let loadedImages = 0;
        
        function imageLoaded() {
            loadedImages++;
            if (loadedImages === images.length) {
                updateActiveSection();
            }
        }
        
        for (let img of images) {
            if (img.complete) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
            }
        }
    });
    
    // Update active section on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateActiveSection, 100);
    });
}); 