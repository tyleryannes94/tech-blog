document.addEventListener('DOMContentLoaded', () => {
    const updatePostForm = document.querySelector('#updatePostForm');

    if (updatePostForm) {
        updatePostForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const postId = updatePostForm.getAttribute('data-post-id');
            const title = document.querySelector('#postTitle').value.trim();
            const content = document.querySelector('#postContent').value.trim();

            if (title && content) {
                fetch(`/api/posts/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, content }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = `/post/${postId}`;
                    } else {
                        alert('Failed to update the post. Please try again.');
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
