function showPackageModal(destination) {
    const modal = document.getElementById('packageModal');
    const title = document.getElementById('modalTitle');
    const optionsContainer = document.querySelector('.package-options');
    
    title.textContent = `${destination} Packages`;
    
    const packages = {
      'Goa': [
        { type: 'Silver', price: 5999, features: ['Beaches, Churches', '2 meals/day', '3D/2N'] },
        { type: 'Gold', price: 8999, features: ['Beaches, Churches, Waterfalls', '3 meals/day', '5D/4N'] },
        { type: 'Platinum', price: 12999, features: ['All attractions + Private tours', 'All inclusive', '7D/6N'] }
      ],
      'Jammu and Kashmir': [
        { type: 'Silver', price: 7999, features: ['Srinagar, Gulmarg', '2 meals/day', '4D/3N'] },
        { type: 'Gold', price: 11999, features: ['Srinagar, Gulmarg, Pahalgam', '3 meals/day', '6D/5N'] },
        { type: 'Platinum', price: 16999, features: ['Full Kashmir tour', 'All inclusive', '8D/7N'] }
      ],
      'Agra': [
        { type: 'Silver', price: 4999, features: ['Taj Mahal visit', '2 meals/day', '2D/1N'] },
        { type: 'Gold', price: 7999, features: ['Taj Mahal + Agra Fort', '3 meals/day', '3D/2N'] },
        { type: 'Platinum', price: 11999, features: ['Full Agra tour + Guide', 'All inclusive', '4D/3N'] }
      ],
      'Mumbai': [
        { type: 'Silver', price: 3999, features: ['City tour', '2 meals/day', '2D/1N'] },
        { type: 'Gold', price: 6999, features: ['City tour + Elephanta Caves', '3 meals/day', '3D/2N'] },
        { type: 'Platinum', price: 9999, features: ['Full Mumbai experience', 'All inclusive', '5D/4N'] }
      ],
      'Amritsar': [
        { type: 'Silver', price: 3499, features: ['Golden Temple visit', '2 meals/day', '2D/1N'] },
        { type: 'Gold', price: 5999, features: ['Golden Temple + Wagah Border', '3 meals/day', '3D/2N'] },
        { type: 'Platinum', price: 8999, features: ['Full Amritsar experience', 'All inclusive', '4D/3N'] }
      ],
      'Rajasthan': [
        { type: 'Silver', price: 4999, features: ['Jaipur city tour', '2 meals/day', '3D/2N'] },
        { type: 'Gold', price: 8999, features: ['Jaipur + Udaipur', '3 meals/day', '5D/4N'] },
        { type: 'Platinum', price: 12999, features: ['Full Rajasthan tour', 'All inclusive', '7D/6N'] }
      ],
      'Hyderabad': [
        { type: 'Silver', price: 3999, features: ['City landmarks', '2 meals/day', '2D/1N'] },
        { type: 'Gold', price: 6999, features: ['City + Ramoji Film City', '3 meals/day', '3D/2N'] },
        { type: 'Platinum', price: 9999, features: ['Full Hyderabad experience', 'All inclusive', '4D/3N'] }
      ]
    };
  
    optionsContainer.innerHTML = '';
    
    packages[destination].forEach(pkg => {
      const packageDiv = document.createElement('div');
      packageDiv.className = `package ${pkg.type.toLowerCase()}`;
      packageDiv.innerHTML = `
        <div class="package-header">
          <h3>${pkg.type} Package</h3>
          <div class="price">₹${pkg.price}/person</div>
        </div>
        <ul class="features">
          ${pkg.features.map(feat => `<li><i class="fas fa-check"></i> ${feat}</li>`).join('')}
        </ul>
        <button class="btn book-btn" onclick="bookPackage('${destination}', '${pkg.type}', ${pkg.price})">Book Now</button>
      `;
      optionsContainer.appendChild(packageDiv);
    });
    
    modal.style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('packageModal').style.display = 'none';
  }
  
  function bookPackage(destination, packageType, price) {
    const optionsContainer = document.querySelector('.package-options');
    optionsContainer.innerHTML = `
      <div class="booking-form">
        <h3>Book ${packageType} Package for ${destination}</h3>
        <form id="modalBookingForm">
          <input type="text" name="name" placeholder="Full Name" required>
          <input type="email" name="email" placeholder="Email" required>
          <input type="tel" name="phone" placeholder="Phone Number" required>
          <input type="date" name="travel_date" placeholder="Travel Date" required>
          <input type="number" name="travelers" placeholder="Number of Persons" min="1" max="10" required>
          <textarea name="special_requests" placeholder="Special Requests"></textarea>
          <input type="hidden" name="destination" value="${destination}">
          <input type="hidden" name="package_type" value="${packageType}">
          <button type="submit" class="btn confirm-btn">Confirm Booking</button>
        </form>
      </div>
    `;
  
    const modalBookingForm = document.getElementById('modalBookingForm');
    modalBookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = {
        name: modalBookingForm.querySelector('[name="name"]').value.trim(),
        email: modalBookingForm.querySelector('[name="email"]').value.trim(),
        phone: modalBookingForm.querySelector('[name="phone"]').value.trim(),
        destination: modalBookingForm.querySelector('[name="destination"]').value,
        package_type: modalBookingForm.querySelector('[name="package_type"]').value,
        travelers: parseInt(modalBookingForm.querySelector('[name="travelers"]').value),
        travel_date: modalBookingForm.querySelector('[name="travel_date"]').value,
        special_requests: modalBookingForm.querySelector('[name="special_requests"]').value.trim()
      };
  
      function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }
  
      function isValidPhone(phone) {
        return /^[0-9]{10}$/.test(phone);
      }
  
      if (!formData.name) {
        alert('Name is required');
        return;
      }
      if (!isValidEmail(formData.email)) {
        alert('Invalid email address');
        return;
      }
      if (!isValidPhone(formData.phone)) {
        alert('Phone must be 10 digits');
        return;
      }
      if (formData.travelers < 1 || formData.travelers > 10) {
        alert('Persons must be between 1 and 10');
        return;
      }
      if (!formData.travel_date) {
        alert('Travel date is required');
        return;
      }
  
      try {
        const response = await fetch('/api/bookings', {  // Changed from '/' to '/api/bookings'
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(formData)
          });
        const result = await response.json();
        if (result.success) {
          alert('Booking successful!');
          closeModal();
        } else {
          alert(result.message || 'Booking failed');
        }
      } catch (error) {
        console.error('Modal booking error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }