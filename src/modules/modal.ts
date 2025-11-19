export function initModal(): void {
    
    const modal = document.getElementById('myModal') as HTMLElement;
    const openBtn = document.getElementById('openModalBtn') as HTMLButtonElement;
    const closeBtn = document.getElementById('closeModalBtn') as HTMLElement;

    if (!modal || !openBtn || !closeBtn) return;

    function openModal(): void {
        modal.style.display = 'block';
    }

    function closeModal(): void {
        modal.style.display = 'none';
    }

    openBtn.onclick = openModal;
    closeBtn.onclick = closeModal;

    window.onclick = (e: MouseEvent) => {
        if (e.target === modal) closeModal();
    }
}