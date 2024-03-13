document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('#logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();

            fetch('/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/';
                } else {
                    alert('Failed to log out. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
