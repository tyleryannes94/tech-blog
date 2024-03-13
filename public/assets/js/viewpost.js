document.addEventListener('DOMContentLoaded', () => {
   
    const newCommentForm = document.querySelector('#newCommentForm');

    if (newCommentForm) {
        newCommentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const postId = newCommentForm.getAttribute('data-post-id');
            const commentContent = document.querySelector('#commentContent').value.trim();

            if (commentContent) {
                fetch(`/api/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ postId, content: commentContent }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.reload();
                    } else {
                        alert('Failed to submit the comment. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                alert('Please enter a comment.');
            }
        });
    }
});
