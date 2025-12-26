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

const observer = new IntersectionObserver((entries) => {
    console.log("Observer callback is executing", entries.length, 'entries');
    entries.forEach(entry => {
        console.log("Entry:", {
            target: entry.target,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
        });
        if (entry.isIntersecting) {
            entry.target.classList.add('featured-item-in-view');
            console.log("Class added to:", entry.target.textContent);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

const items = document.querySelectorAll('#featured-items li');
console.log("Found", items.length, 'items to observe');

items.forEach((item, index) => {
    console.log(`Observing item ${index + 1}: `, item.textContent, item);
    observer.observe(item);
});
