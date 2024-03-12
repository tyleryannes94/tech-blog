$(document).ready(function() {
    // Handle the sign-up form submission
    $('#signup-form').on('submit', function(event) {
      event.preventDefault();
  
      const userData = {
        username: $('#username-signup').val().trim(),
        email: $('#email-signup').val().trim(),
        password: $('#password-signup').val().trim(),
      };
  
      if (!userData.username || !userData.email || !userData.password) {
        return;
      }
  
      // Send a POST request to the server
      $.post('/api/users/signup', userData)
        .then(function(data) {
          window.location.replace('/dashboard'); 
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  
    // Handle the login form submission
    $('#login-form').on('submit', function(event) {
      event.preventDefault();
  
      const userData = {
        email: $('#email-login').val().trim(),
        password: $('#password-login').val().trim(),
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      $.post('/api/users/login', userData)
        .then(function(data) {
          window.location.replace('/dashboard'); 
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  
    // Handle logout
    $('#logout').on('click', function(event) {
      event.preventDefault();
  
      $.post('/api/users/logout')
        .then(function() {
          window.location.replace('/'); 
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  });
  