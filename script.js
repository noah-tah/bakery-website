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
/*
This section will set up the boolean values for the device size.
*/

const isMobile = window.matchMedia("(max-width: 767px)").matches;
const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
const isDesktop = window.matchMedia("(min-width: 1025px)").matches;




/*
    Implementation below is for the desktop version of the website.
*/

if (isDesktop) {
    const items = document.querySelectorAll('#featured-items li');
    console.log("Found", items.length, 'items to observe');
    items.forEach((item, index) => {
        console.log(`Observing item ${index + 1}: `, item.textContent, item);
        observer.observe(item);
    });
}

/*
    On Tablet, we will only animate the entire featured-items section
    instead of the individual list items as we are on Desktop
*/

if (isTablet) {
    const item = document.querySelector('.featured-items-card');
    console.log("Observing item:", item);
    observer.observe(item);

}

if (isMobile) {
    const items = document.querySelectorAll('#featured-items li');
    console.log("Found", items.length, 'items to observe');
    items.forEach((item, index) => {
        console.log(`Observing item ${index + 1}: `, item.textContent, item);
        observer.observe(item);
    });
}