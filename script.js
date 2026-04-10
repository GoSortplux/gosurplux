document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    // -- RANDOMIZE SOCIAL CARDS --
    const socialGrid = document.getElementById('social-grid');
    if (socialGrid) {
        const cards = Array.from(socialGrid.children);
        // Fisher-Yates shuffle
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        // Re-append cards in random order
        cards.forEach(card => socialGrid.appendChild(card));
    }

    // -- THEME TOGGLE --
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // -- MOBILE NAVIGATION --
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // -- STICKY HEADER SHADOW --
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px var(--shadow-color)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // -- SMOOTH SCROLLING --
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // -- FOOTER YEAR --
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // -- TYPED.JS FOR HERO SUBTITLE (Dev Mode) --
    const typed = new Typed('#typed-subtitle', {
        strings: [
            '<span class="code-keyword">const</span> <span class="code-function">solution</span> = () => {<br>&nbsp;&nbsp;<span class="code-keyword">return</span> <span class="code-string">"the solutions that sorts it!"</span>;<br>};',
            '<span class="code-comment">// Building bold digital experiences...</span><br><span class="code-keyword">engine</span>.<span class="code-function">start</span>({ <span class="code-string">"performance"</span>: <span class="code-keyword">true</span> });'
        ],
        typeSpeed: 40,
        backSpeed: 20,
        loop: true,
        startDelay: 500,
        showCursor: true,
        cursorChar: '_',
        contentType: 'html'
    });

    // -- SCROLL REVEAL --
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // -- SCROLL-TO-TOP BUTTON --
   const scrollToTopBtn = document.getElementById('scroll-to-top');

scrollToTopBtn.addEventListener('click', function (e) {
    e.preventDefault(); // prevent the default anchor behavior
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smooth scroll
    });
});


    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
});
