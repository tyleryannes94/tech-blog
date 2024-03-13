document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.querySelector('#username').value.trim();
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();

            if (username && email && password) {
                fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = '/login';
                    } else {
                        alert('Failed to sign up. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
