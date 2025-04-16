document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
  
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  
    function showNotification(message, isSuccess) {
      notification.textContent = message;
      notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
      notification.style.display = 'block';
      setTimeout(() => (notification.style.display = 'none'), 5000);
    }
  
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = {
        name: contactForm.querySelector('[name="name"]').value.trim(),
        email: contactForm.querySelector('[name="email"]').value.trim(),
        phone: contactForm.querySelector('[name="phone"]').value.trim(),
        subject: contactForm.querySelector('[name="subject"]').value.trim(),
        message: contactForm.querySelector('[name="message"]').value.trim()
      };
  
      if (!formData.name) {
        showNotification('Name is required', false);
        return;
      }
      if (!isValidEmail(formData.email)) {
        showNotification('Invalid email address', false);
        return;
      }
      if (!formData.message) {
        showNotification('Message is required', false);
        return;
      }
  
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (result.success) {
          showNotification('Message sent successfully!', true);
          contactForm.reset();
        } else {
          showNotification(result.message || 'Failed to send message', false);
        }
      } catch (error) {
        console.error('Contact error:', error);
        showNotification('An error occurred. Please try again.', false);
      }
    });
  });