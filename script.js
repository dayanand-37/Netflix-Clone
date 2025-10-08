// Netflix Clone Interactive Features with Backend Integration

// DOM Elements
const signInBtn = document.getElementById('signInBtn');
const signInModal = document.getElementById('signInModal');
const closeModalBtn = document.querySelector('.close-modal');
const signInForm = document.getElementById('signInForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginEmailError = document.getElementById('loginEmailError');
const loginPasswordError = document.getElementById('loginPasswordError');

// Sign Up elements
const signUpModal = document.getElementById('signUpModal');
const signUpForm = document.getElementById('signUpForm');
const closeSignUpBtn = document.querySelector('.close-signup');
const showSignUpLink = document.getElementById('showSignUp');
const showSignInLink = document.getElementById('showSignIn');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupNameError = document.getElementById('signupNameError');
const signupEmailError = document.getElementById('signupEmailError');
const signupPasswordError = document.getElementById('signupPasswordError');

// Modal functionality
function openModal() {
    signInModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    signInModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    // Clear form and errors when closing
    signInForm.reset();
    hideError('loginEmail');
    hideError('loginPassword');
}

function openSignUpModal() {
    signUpModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeSignUpModal() {
    signUpModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (signUpForm) signUpForm.reset();
    hideError('signupName');
    hideError('signupEmail');
    hideError('signupPassword');
}

// Event Listeners
if (signInBtn) {
    signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (closeSignUpBtn) {
    closeSignUpBtn.addEventListener('click', closeSignUpModal);
}

if (showSignUpLink) {
    showSignUpLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        openSignUpModal();
    });
}

if (showSignInLink) {
    showSignInLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeSignUpModal();
        openModal();
    });
}

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === signInModal) {
        closeModal();
    }
    if (e.target === signUpModal) {
        closeSignUpModal();
    }
});

// Form validation
function validateForm() {
    let isValid = true;
    
    // Email validation
    if (!loginEmail.value.trim()) {
        showError('loginEmail', 'Please enter a valid email or phone number.');
        isValid = false;
    } else if (!validateEmail(loginEmail.value.trim())) {
        showError('loginEmail', 'Please enter a valid email address.');
        isValid = false;
    } else {
        hideError('loginEmail');
    }
    
    // Password validation
    if (!loginPassword.value) {
        showError('loginPassword', 'Your password must contain between 4 and 60 characters.');
        isValid = false;
    } else if (loginPassword.value.length < 4) {
        showError('loginPassword', 'Your password must contain between 4 and 60 characters.');
        isValid = false;
    } else {
        hideError('loginPassword');
    }
    
    return isValid;
}

// Form submission
if (signInForm) {
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        try {
            // Show loading state
            const submitBtn = signInForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            
            // Call the login API
            const resp = await login(loginEmail.value, loginPassword.value);
            // Backend returns { success, data: { user, token, refreshToken } }
            const token = resp?.data?.token || resp?.token;
            if (token) {
                localStorage.setItem('token', token);
            }
            
            // Show success message
            showMessage('Successfully signed in!', 'success');
            
            // Redirect to the main page or dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'browse.html'; // Redirect to browse page or home
            }, 1000);
            
        } catch (error) {
            console.error('Login failed:', error);
            showMessage(error.message || 'Login failed. Please try again.', 'error');
        } finally {
            // Reset button state
            const submitBtn = signInForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Sign In';
        }
    });
}

// Sign Up form submission
if (signUpForm) {
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let valid = true;
        if (!signupName.value.trim()) { showError('signupName', 'Please enter your name.'); valid = false; } else { hideError('signupName'); }
        if (!signupEmail.value.trim() || !validateEmail(signupEmail.value)) { showError('signupEmail', 'Please enter a valid email.'); valid = false; } else { hideError('signupEmail'); }
        if (!signupPassword.value || signupPassword.value.length < 6) { showError('signupPassword', 'Password must be at least 6 characters.'); valid = false; } else { hideError('signupPassword'); }
        if (!valid) return;

        const submitBtn = signUpForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

        try {
            const resp = await register(signupName.value, signupEmail.value, signupPassword.value);
            const token = resp?.data?.token || resp?.token;
            if (token) {
                localStorage.setItem('token', token);
            }
            showMessage('Account created! Redirecting...', 'success');
            setTimeout(() => {
                closeSignUpModal();
                window.location.href = 'browse.html';
            }, 1000);
        } catch (error) {
            showMessage(error.message || 'Registration failed. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Helper functions for showing/hiding errors
function showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error class to input
        const input = document.getElementById(field);
        if (input) {
            input.style.borderColor = '#e87c03';
        }
    }
}

function hideError(field) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
        errorElement.style.display = 'none';
        
        // Remove error class from input
        const input = document.getElementById(field);
        if (input) {
            input.style.borderColor = '';
        }
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Show message function
function showMessage(text, type = 'info') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Add the message to the form
    const form = document.querySelector('.auth-form');
    if (form) {
        form.insertBefore(message, form.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 5000);
    }
}

// Import API client (in a real project, you'd use a module bundler)
// For now, we'll define the API functions inline

const API_BASE_URL = 'http://localhost:5000/api';

// API Helper Functions
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication functions
const login = async (email, password) => {
    return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

const register = async (name, email, password) => {
    return apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
    });
};

const submitContact = async (contactData) => {
    return apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
    });
};

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Email validation and form handling
    const emailInputs = document.querySelectorAll('.email-input');
    const getStartedBtns = document.querySelectorAll('#getStartedBtn, #getStartedBtn2');
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId);
        const input = document.getElementById(inputId.replace('Error', 'Input'));
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.style.borderColor = '#e50914';
    }
    
    function hideError(inputId) {
        const errorElement = document.getElementById(inputId);
        const input = document.getElementById(inputId.replace('Error', 'Input'));
        
        errorElement.classList.remove('show');
        input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }
    
    emailInputs.forEach((input, index) => {
        const errorId = `emailError${index === 0 ? '' : '2'}`;
        
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                hideError(errorId);
            } else if (!validateEmail(input.value)) {
                showError(errorId, 'Please enter a valid email address');
            } else {
                hideError(errorId);
            }
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '' && !validateEmail(input.value)) {
                showError(errorId, 'Please enter a valid email address');
            }
        });
    });
    
    getStartedBtns.forEach((btn, index) => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const inputId = `emailInput${index === 0 ? '' : '2'}`;
            const errorId = `emailError${index === 0 ? '' : '2'}`;
            const input = document.getElementById(inputId);
            
            if (input.value.trim() === '') {
                showError(errorId, 'Email address is required');
            } else if (!validateEmail(input.value)) {
                showError(errorId, 'Please enter a valid email address');
            } else {
                // Show loading state
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                btn.disabled = true;
                
                try {
                    // Send email to backend subscribe endpoint
                    await apiRequest('/contact/subscribe', {
                        method: 'POST',
                        body: JSON.stringify({ email: input.value })
                    });
                    showMessage('Thanks! We\'ll reach out soon.', 'success');
                    openModal();
                } catch (error) {
                    showMessage(error.message || 'Failed to submit email. Try again.', 'error');
                }
                
                // Reset button state
                btn.innerHTML = '<span>Get Started</span><i class="fas fa-chevron-right"></i>';
                btn.disabled = false;
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to navbar
    navbar.style.transition = 'transform 0.3s ease-in-out';

    // Language selector functionality
    const languageSelect = document.querySelector('.language-selector select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            // Simulate language change
            console.log('Language changed to:', e.target.value);
            // Here you would typically implement actual language switching
        });
    }

    // Sign in button functionality
    const signInBtn = document.getElementById('signInBtn');
    if (signInBtn) {
        signInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate sign in process
            alert('Sign in functionality would be implemented here with backend integration');
        });
    }

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effects to FAQ items
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Contact Form Functionality
    const contactModal = document.getElementById('contactModal');
    const contactBtn = document.getElementById('contactBtn');
    const contactForm = document.getElementById('contactForm');
    const closeBtn = document.querySelector('.close');

    // Open contact modal
    contactBtn.addEventListener('click', () => {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close contact modal
    closeBtn.addEventListener('click', () => {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const contactData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };
            
            await submitContact(contactData);
            
            // Show success message
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            
            // Close modal after a delay
            setTimeout(() => {
                contactModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 2000);
            
        } catch (error) {
            showMessage('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Show message function
    function showMessage(text, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        contactForm.insertBefore(message, contactForm.firstChild);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }

    // Add CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .faq-item {
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        
        .btn {
            transition: transform 0.15s ease, background-color 0.3s ease;
        }
        
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .main {
            padding-top: 70px;
        }
    `;
    document.head.appendChild(style);
});
