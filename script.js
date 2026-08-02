/**
 * B Jagan - Personal Portfolio JavaScript
 * Premium UI/UX Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. INITIALIZE THIRD PARTY LIBRARIES & PAGE PRELOADER
    // ==========================================================================
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Page Preloader Removal
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600); // matches style transition duration
        }
    });

    // ==========================================================================
    // 2. STICKY HEADER, SCROLL PROGRESS & BACK TO TOP BUTTON
    // ==========================================================================
    const header = document.querySelector('.header');
    const scrollBar = document.getElementById('scroll-bar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Sticky Header class addition
        if (scrollTop > 50) {
            header.classList.add('glass-scrolled');
        } else {
            header.classList.remove('glass-scrolled');
        }

        // Scroll Progress Bar percentage mapping
        if (scrollHeight > 0 && scrollBar) {
            const scrolledPercentage = (scrollTop / scrollHeight) * 100;
            scrollBar.style.width = `${scrolledPercentage}%`;
        }

        // Back to Top trigger visibility
        if (scrollTop > 400 && backToTopBtn) {
            backToTopBtn.classList.add('show');
        } else if (backToTopBtn) {
            backToTopBtn.classList.remove('show');
        }
        
        // Dynamic Active Navigation tracking
        trackActiveSection();
    });

    // Back to Top scroll trigger
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Nav active section indicator mapping
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function trackActiveSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 120; // offset matches header size

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-link');
            }
        });
    }

    // ==========================================================================
    // 3. RESPONSIVE MOBILE NAVIGATION DRAWER
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on click of nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 4. THEME TOGGLE (DARK / LIGHT THEME PARADIGMS)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check LocalStorage for saved theme selection
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            
            // Save state in browser LocalStorage
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ==========================================================================
    // 5. CUSTOM FLOATING DOT AND RING CURSOR
    // ==========================================================================
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorRing = document.getElementById('custom-cursor-ring');
    let mouseX = 0, mouseY = 0; // target mouse coordinates
    let ringX = 0, ringY = 0; // lag ring coordinates

    // Disable custom cursor on mobile/touch screens
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Ring lag animation loop
        const animateCursorRing = () => {
            // interpolation formula to follow with a delay
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursorRing);
        };
        animateCursorRing();

        // Expand/Interact cursor ring on links hover
        const interactables = document.querySelectorAll('a, button, .tab-btn, .filter-btn, .social-icon-btn');
        interactables.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                cursorRing.style.width = '50px';
                cursorRing.style.height = '50px';
                cursorRing.style.borderColor = 'var(--accent-primary)';
                cursorRing.style.backgroundColor = 'rgba(0, 242, 254, 0.05)';
            });
            elem.addEventListener('mouseleave', () => {
                cursorRing.style.width = '32px';
                cursorRing.style.height = '32px';
                cursorRing.style.borderColor = 'var(--accent-secondary)';
                cursorRing.style.backgroundColor = 'transparent';
            });
        });
    } else {
        // If touch device, clear custom cursor containers
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorRing) cursorRing.style.display = 'none';
    }

    // ==========================================================================
    // 6. HERO INTERACTIVE BACKGROUND PARTICLES (CANVAS)
    // ==========================================================================
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let canvasWidth = canvas.width = canvas.parentElement.offsetWidth;
        let canvasHeight = canvas.height = canvas.parentElement.offsetHeight;

        // Resize Canvas dynamically
        window.addEventListener('resize', () => {
            canvasWidth = canvas.width = canvas.parentElement.offsetWidth;
            canvasHeight = canvas.height = canvas.parentElement.offsetHeight;
            initParticles();
        });

        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle Blueprint
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            // Draw particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            // Move particle and handle collision
            update() {
                // Border collision checks
                if (this.x > canvasWidth || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvasHeight || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Mouse proximity push logic
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius + this.size) {
                        if (mouse.x < this.x && this.x < canvasWidth - this.size * 10) {
                            this.x += 3;
                        }
                        if (mouse.x > this.x && this.x > this.size * 10) {
                            this.x -= 3;
                        }
                        if (mouse.y < this.y && this.y < canvasHeight - this.size * 10) {
                            this.y += 3;
                        }
                        if (mouse.y > this.y && this.y > this.size * 10) {
                            this.y -= 3;
                        }
                    }
                }

                // Regular movement path
                this.x += this.directionX;
                this.y += this.directionY;
                
                this.draw();
            }
        }

        // Initialize particle array
        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvasWidth * canvasHeight) / 10000;
            // Cap density limit
            numberOfParticles = Math.min(numberOfParticles, 85);
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvasWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvasHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.8) - 0.4;
                let directionY = (Math.random() * 0.8) - 0.4;
                // Soft blue cyan accent colors
                let color = body.classList.contains('light-theme') ? 'rgba(2, 132, 199, 0.2)' : 'rgba(0, 242, 254, 0.25)';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Draw connections lines
        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 110) {
                        opacityValue = 1 - (distance / 110);
                        let lineColor = body.classList.contains('light-theme') 
                            ? `rgba(2, 132, 199, ${opacityValue * 0.12})` 
                            : `rgba(0, 242, 254, ${opacityValue * 0.15})`;
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation render loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            for (let i = 0; i < particlesArray.length; i++) {
                // Update particle styles if theme switches
                particlesArray[i].color = body.classList.contains('light-theme') 
                    ? 'rgba(2, 132, 199, 0.2)' 
                    : 'rgba(0, 242, 254, 0.25)';
                particlesArray[i].update();
            }
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // ==========================================================================
    // 7. HERO TYPING TYPWRITER ANIMATION EFFECT
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const professions = [
            'MCA Student', 
            'Java Developer', 
            'Python Developer', 
            'Machine Learning Enthusiast', 
            'AI Engineer', 
            'Full Stack Learner', 
            'Problem Solver'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = professions[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deletes faster
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 120; // Standard typing delay
            }

            // Word completed
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % professions.length;
                typeSpeed = 400; // Small delay before next word
            }

            setTimeout(type, typeSpeed);
        }
        
        // Trigger typing
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // 8. TECHNICAL SKILLS TABS FILTERING & INTERSECTION OBSERVATION ANIMATION
    // ==========================================================================
    const skillCards = document.querySelectorAll('.skill-card');
    const skillTabs = document.querySelectorAll('.tab-btn');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabCategory = tab.getAttribute('data-tab');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (tabCategory === 'all' || tabCategory === cardCategory) {
                    card.style.display = 'block';
                    // Retrigger animation state
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // Intersection Observer for Skill Progress Bars Loading
    const skillBars = document.querySelectorAll('.progress');
    const skillsSection = document.getElementById('skills');

    const fillSkillProgressBars = () => {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    };

    if ('IntersectionObserver' in window && skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fillSkillProgressBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        skillsObserver.observe(skillsSection);
    } else {
        // Fallback for older browsers
        setTimeout(fillSkillProgressBars, 1500);
    }

    // ==========================================================================
    // 9. ANIMATED MILESTONES COUNTER LOGIC
    // ==========================================================================
    const counters = document.querySelectorAll('.counter-number');
    const achievementsSection = document.getElementById('achievements');

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Count scaling calculations
                const speed = 100; // higher is slower
                const increment = Math.ceil(target / speed);
                
                if (count < target) {
                    counter.innerText = count + increment > target ? target : count + increment;
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    if ('IntersectionObserver' in window && achievementsSection) {
        const achievementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        achievementsObserver.observe(achievementsSection);
    } else {
        setTimeout(animateCounters, 1500);
    }

    // ==========================================================================
    // 10. PROJECTS FILTERING & LIVE SEARCH
    // ==========================================================================
    const projectCards = document.querySelectorAll('.project-card');
    const projectFilterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search');

    let activeFilter = 'all';
    let searchQuery = '';

    // Apply combined filter & search
    function filterProjects() {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('.project-title').textContent.toLowerCase();
            const cardTech = card.querySelector('.project-tech').textContent.toLowerCase();
            
            const matchesFilter = (activeFilter === 'all' || cardCategory === activeFilter);
            const matchesSearch = (cardTitle.includes(searchQuery) || cardTech.includes(searchQuery));

            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Filter Buttons listeners
    projectFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            filterProjects();
        });
    });

    // Search Input listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProjects();
        });
    }

    // ==========================================================================
    // 11. CONTACT FORM VALIDATION & AJAX ACTION SIMULATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formSubject = document.getElementById('form-subject');
    const formMessage = document.getElementById('form-message');
    const formAlert = document.getElementById('form-alert');

    // Email Regex checker
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Set input status
    function setInputStatus(inputElement, isValid) {
        const group = inputElement.parentElement;
        if (isValid) {
            group.classList.remove('invalid');
        } else {
            group.classList.add('invalid');
        }
    }

    // Input listeners to clear errors on typing
    const inputsList = [formName, formEmail, formSubject, formMessage];
    inputsList.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    setInputStatus(input, true);
                }
            });
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;

            // Name verification
            if (formName.value.trim() === '') {
                setInputStatus(formName, false);
                isFormValid = false;
            } else {
                setInputStatus(formName, true);
            }

            // Email verification
            if (formEmail.value.trim() === '' || !isValidEmail(formEmail.value.trim())) {
                setInputStatus(formEmail, false);
                isFormValid = false;
            } else {
                setInputStatus(formEmail, true);
            }

            // Subject verification
            if (formSubject.value.trim() === '') {
                setInputStatus(formSubject, false);
                isFormValid = false;
            } else {
                setInputStatus(formSubject, true);
            }

            // Message verification
            if (formMessage.value.trim() === '') {
                setInputStatus(formMessage, false);
                isFormValid = false;
            } else {
                setInputStatus(formMessage, true);
            }

            // Form Submit Simulation
            if (isFormValid) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalBtnText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span><i class="fa-solid fa-circle-notch fa-spin"></i>`;
                
                // Simulate server latency
                setTimeout(() => {
                    formAlert.className = 'form-status-alert success';
                    formAlert.innerText = 'Thank you! Your message has been sent successfully. Jagan will get back to you shortly.';
                    
                    // Reset fields
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    // Clear alert after 8 seconds
                    setTimeout(() => {
                        formAlert.style.display = 'none';
                    }, 8000);
                }, 1800);
            } else {
                formAlert.className = 'form-status-alert error';
                formAlert.innerText = 'Please correct the errors in the fields above.';
                formAlert.style.display = 'block';
            }
        });
    }

    // ==========================================================================
    // 12. DEMO MODAL TRIGGER EVENTS
    // ==========================================================================
    const demoModal = document.getElementById('demo-modal');
    const demoButtons = document.querySelectorAll('.demo-trigger');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (demoModal) {
        demoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                demoModal.classList.add('active');
                body.style.overflow = 'hidden'; // stop page scrolling
            });
        });

        const closeModal = () => {
            demoModal.classList.remove('active');
            body.style.overflow = '';
        };

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        // Close on overlay backdrop clicks
        demoModal.addEventListener('click', (e) => {
            if (e.target === demoModal) {
                closeModal();
            }
        });
    }
});
