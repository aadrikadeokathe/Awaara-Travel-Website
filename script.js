document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginFormContainer = document.querySelector('.login-form-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const formClose = document.getElementById('form-close');
    const showRegisterLink = document.getElementById('show-register-link');
    const showLoginLink = document.getElementById('show-login-link');
  
    // API Configuration
    const API_BASE_URL = 'http://localhost:3001';
  
    // Notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  
    function showNotification(message, isSuccess) {
      notification.textContent = message;
      notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
      notification.style.display = 'block';
      setTimeout(() => (notification.style.display = 'none'), 3000);
    }
  
    // Form toggling
    if (showRegisterLink) {
      showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
      });
    }
  
    if (showLoginLink) {
      showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
      });
    }
  
    // Open/close login form
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        loginFormContainer.style.display = 'block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
      });
    }
  
    if (formClose) {
      formClose.addEventListener('click', () => {
        loginFormContainer.style.display = 'none';
      });
    }
  
    // Login form submission
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value;
        const remember = loginForm.querySelector('input[type="checkbox"]').checked;
  
        try {
          const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password, remember })
          });
  
          const data = await response.json();
  
          if (data.success) {
            showNotification('Login successful!', true);
            loginFormContainer.style.display = 'none';
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
          } else {
            showNotification(data.message || 'Login failed', false);
          }
        } catch (error) {
          console.error('Login error:', error);
          showNotification('An error occurred during login', false);
        }
      });
    }
  
    // Register form submission
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const full_name = registerForm.querySelector('input[type="text"]').value.trim();
        const email = registerForm.querySelector('input[type="email"]').value.trim();
        const phone = registerForm.querySelector('input[type="tel"]').value.trim();
        const password = registerForm.querySelector('input[type="password"]').value;
  
        try {
          const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name, email, phone, password })
          });
  
          const data = await response.json();
  
          if (data.success) {
            showNotification('Registration successful! Please login.', true);
            registerForm.reset();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
          } else {
            showNotification(data.message || 'Registration failed', false);
          }
        } catch (error) {
          console.error('Registration error:', error);
          showNotification('An error occurred during registration', false);
        }
      });
    }
  
    // Logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
            method: 'POST',
            credentials: 'include'
          });
  
          const data = await response.json();
  
          if (data.success) {
            showNotification('Logged out successfully', true);
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
          } else {
            showNotification(data.message || 'Logout failed', false);
          }
        } catch (error) {
          console.error('Logout error:', error);
          showNotification('An error occurred during logout', false);
        }
      });
    }
  
    // Check auth status on page load
    async function checkAuthStatus() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/check`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success && data.user) {
          loginBtn.style.display = 'none';
          logoutBtn.style.display = 'block';
        } else {
          loginBtn.style.display = 'block';
          logoutBtn.style.display = 'none';
        }
      } catch (error) {
        console.error('Auth check error:', error);
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
      }
    }
  
    checkAuthStatus();
  });