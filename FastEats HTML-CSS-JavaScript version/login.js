document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
  
    signupLink.addEventListener('click', function(e) {
      e.preventDefault();
      loginContainer.style.display = 'none';
      signupContainer.style.display = 'block';
    });
  
    loginLink.addEventListener('click', function(e) {
      e.preventDefault();
      loginContainer.style.display = 'block';
      signupContainer.style.display = 'none';
    });
  
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
  
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Handle login form submission
      //alert('Login form submitted!');

      window.location.href = 'kfc.html';
      
    });
  
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Handle signup form submission
      alert('Signup form submitted!');

      window.location.href = 'kfc.html';
    });
  });
  