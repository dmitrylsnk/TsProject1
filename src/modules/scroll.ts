export function initScroll(): void {
    const header = document.getElementById('header') as HTMLElement;
    
    if (!header) return;

    window.onscroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}