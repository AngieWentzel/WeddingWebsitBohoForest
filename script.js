
        // Mobile menu toggle with improved functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        const body = document.body;
        
        function toggleMobileMenu() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            const isActive = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        }
        
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Header scroll effect
        const header = document.querySelector('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Countdown timer
        function updateCountdown() {
            const weddingDate = new Date('October 15, 2023 15:00:00').getTime();
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initialize countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Form submission handling
        document.getElementById('rsvpForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would send data to Google Sheets
            // For this demo, we'll just show an alert
            alert('Thank you for your RSVP! In a real implementation, this data would be saved to Google Sheets.');
            
            // Reset form
            this.reset();
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Update plus-one checkbox based on guests selection
        document.getElementById('guests').addEventListener('change', function() {
            const guestsCount = parseInt(this.value);
            const plusOneCheckbox = document.getElementById('plus-one');
            
            if(guestsCount > 1) {
                plusOneCheckbox.checked = true;
                plusOneCheckbox.disabled = true;
            } else {
                plusOneCheckbox.disabled = false;
            }
        });
        
        // Handle window resize for responsive adjustments
        function handleResize() {
            // If window is larger than mobile breakpoint, ensure mobile menu is closed
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
        
        window.addEventListener('resize', handleResize);
        
        // Initialize on page load
        handleResize();
