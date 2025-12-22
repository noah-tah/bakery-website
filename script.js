(function () {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const openers = document.querySelectorAll('.cta-button');
    const closer = modal.querySelector('.close');

    function openModal() {
        modal.setAttribute('aria-hidden', 'false');
        // focus first input
        const first = modal.querySelector('input,button,textarea,select');
        if (first) first.focus();
        document.addEventListener('keydown', onKeyDown);
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', onKeyDown);
        resetForm();
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') closeModal();
    }

    openers.forEach(btn => btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
    }));

    closer.addEventListener('click', closeModal);

    // close when clicking outside modal-content
    modal.addEventListener('click', function (e) {
        if (!modalContent.contains(e.target)) closeModal();
    });

    // prevent clicks inside content from closing
    modalContent.addEventListener('click', function (e) { e.stopPropagation(); });

    function resetForm() {
        const form = modal.querySelector('.modal-form');
        form.reset();
    }
})();

submitForm = () => {
    alert("Form Submitted!");
}