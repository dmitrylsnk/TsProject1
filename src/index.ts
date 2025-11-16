const modal = document.getElementById('myModal') as HTMLElement;
const openBtn = document.getElementById('openModalBtn') as HTMLButtonElement;
const closeBtn = document.getElementById('closeModalBtn') as HTMLElement;

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

openBtn.onclick = openModal;
closeBtn.onclick = closeModal;

window.onclick = (e) => {
    if (e.target === modal) closeModal();
}

const header = document.getElementById('header') as HTMLElement;

window.onscroll = () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const postsContainer = document.getElementById('posts-container') as HTMLElement;

async function fetchPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data: Post[] = await res.json();
        showPosts(data);
    } catch {
        postsContainer.innerHTML = 'load error';
    }
}

function showPosts(posts: Post[]) {
    postsContainer.innerHTML = '';
    posts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h4>${p.id}. ${p.title}</h4><p>${p.body}</p>`;
        postsContainer.appendChild(div);
    });
}

fetchPosts();