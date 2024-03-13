document.addEventListener('DOMContentLoaded', function() {

    const newPostForm = document.querySelector('#newPostForm');
    if (newPostForm) {
        newPostForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const postData = {
                title: document.querySelector('#postTitle').value,
                content: document.querySelector('#postContent').value
            };

            fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = '/dashboard';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
