(function () {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const openers = document.querySelectorAll('.cta-button');
    const closer = modal.querySelector('.close');

    function openModal() {
        modal.setAttribute('aria-hidden', 'false');
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

    modal.addEventListener('click', function (e) {
        if (!modalContent.contains(e.target)) closeModal();
    });

    modalContent.addEventListener('click', function (e) { e.stopPropagation(); });

    function resetForm() {
        const form = modal.querySelector('.modal-form');
        form.reset();
    }
})();


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
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

const isMobile = window.matchMedia("(max-width: 767px)").matches;
const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

if (isDesktop) {
    const items = document.querySelectorAll('#featured-items li');
    items.forEach((item, index) => {
        observer.observe(item);
    });
}

if (isTablet) {
    const item = document.querySelector('.featured-items-card');
    observer.observe(item);
}

if (isMobile) {
    const items = document.querySelectorAll('#featured-items li');
    items.forEach(item => {
        item.classList.add('featured-item-in-view');
    })
}


document.querySelector('#submit-button').addEventListener('click', () => {
    e.preventDefault();


    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    const address = document.querySelector('#address').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (name === '' || email === '' || phone === '' || address === '' || message === '') {
        alert("Please fill out all fields");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    const data = { name, email, phone, address, message };
    fetch('/submit-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Request submitted! We will get back to you as soon as possible!");
        document.getElementById('modal').setAttribute('aria-hidden', 'true');
        document.querySelector('.modal-form').reset();
    })
    .catch(error => {
        alert("Error submitting request. Please try again.");
        console.error('Error:', error);
    });
});