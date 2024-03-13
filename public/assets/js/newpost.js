document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.querySelector('#newPostForm');

    if (newPostForm) {
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.querySelector('#postTitle').value.trim();
            const content = document.querySelector('#postContent').value.trim();

            if (title && content) {
                fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, content }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = '/dashboard';
                    } else {
                        alert('Failed to create the post. Please try again.');
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
