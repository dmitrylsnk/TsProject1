import { initModal } from "./modules/modal.js";
import { initScroll } from "./modules/scroll.js";
import { getPosts } from "./modules/api.js";
import { renderPosts } from "./modules/ui.js";





async function startApp() {

    initModal();
    initScroll();

    const posts = await getPosts();

    renderPosts(posts);
}



startApp();