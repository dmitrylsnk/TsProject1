var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modal = document.getElementById('myModal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
}
openBtn.onclick = openModal;
closeBtn.onclick = closeModal;
window.onclick = (e) => {
    if (e.target === modal)
        closeModal();
};
const header = document.getElementById('header');
window.onscroll = () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }
};
const postsContainer = document.getElementById('posts-container');
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
            const data = yield res.json();
            showPosts(data);
        }
        catch (_a) {
            postsContainer.innerHTML = 'load error';
        }
    });
}
function showPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h4>${p.id}. ${p.title}</h4><p>${p.body}</p>`;
        postsContainer.appendChild(div);
    });
}
fetchPosts();
export {};
//# sourceMappingURL=index.js.map