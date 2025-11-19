export function initModal() {
    const modal = document.getElementById('myModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    if (!modal || !openBtn || !closeBtn)
        return;
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
}
//# sourceMappingURL=modal.js.map