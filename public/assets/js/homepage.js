document.addEventListener('DOMContentLoaded', function() {
    function loadPosts() {
        fetch('/api/posts')
            .then(response => response.json())
            .then(posts => {
                const postsContainer = document.querySelector('#postsContainer');
                postsContainer.innerHTML = ''; 

                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.content.substring(0, 150)}...</p>
                        <a href="/post/${post.id}">Read more</a>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error loading posts:', error));
    }

    loadPosts();
});
