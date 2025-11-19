export function initScroll() {
    const header = document.getElementById('header');
    if (!header)
        return;
    window.onscroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        else {
            header.classList.remove('scrolled');
        }
    };
}
//# sourceMappingURL=scroll.js.map