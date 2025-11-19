const postsContainer = document.getElementById('posts-container');
export function renderPosts(posts) {
    if (!postsContainer)
        return;
    if (posts.length === 0) {
        postsContainer.innerHTML = 'load error';
        return;
    }
    postsContainer.innerHTML = '';
    posts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h4>${p.id}. ${p.title}</h4><p>${p.body}</p>`;
        postsContainer.appendChild(div);
    });
}
//# sourceMappingURL=ui.js.map