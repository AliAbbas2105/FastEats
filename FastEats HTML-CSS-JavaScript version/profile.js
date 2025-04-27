document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  const emailLink = document.getElementById('emailLink');
  const phoneLink = document.getElementById('phoneLink');
  const emailUpdateForm = document.getElementById('emailUpdateForm');
  const phoneUpdateForm = document.getElementById('phoneUpdateForm');

  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const itemName = this.querySelector('span').textContent.toLowerCase();
      // You can add logic here based on the clicked item (e.g., show different content)
      console.log(`Clicked ${itemName}`);
    });
  });

  emailLink.addEventListener('click', function(e) {
    e.preventDefault();
    const confirmChange = confirm('Do you want to change your email?');
    if (confirmChange) {
      emailUpdateForm.style.display = 'block';
      phoneUpdateForm.style.display = 'none';
    }
  });

  phoneLink.addEventListener('click', function(e) {
    e.preventDefault();
    const confirmChange = confirm('Do you want to change your phone number?');
    if (confirmChange) {
      phoneUpdateForm.style.display = 'block';
      emailUpdateForm.style.display = 'none';
    }
  });

  // Handle email update form submission
  const emailForm = document.getElementById('emailForm');
  emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newEmail = document.getElementById('newEmail').value;
    if (validateEmail(newEmail)) {
      emailLink.textContent = newEmail;
      emailForm.reset();
      emailUpdateForm.style.display = 'none';
    } else {
      alert('Please enter a valid email address.');
    }
  });

  // Handle phone number update form submission
  const phoneForm = document.getElementById('phoneForm');
  phoneForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newPhone = document.getElementById('newPhone').value;
    if (validatePhone(newPhone)) {
      phoneLink.textContent = newPhone;
      phoneForm.reset();
      phoneUpdateForm.style.display = 'none';
    } else {
      alert('Please enter a valid phone number.');
    }
  });

  // Function to validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate phone number format
  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
});
