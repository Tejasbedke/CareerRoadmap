const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('visible');
    menuBtn.textContent = menu.classList.contains('visible') ? '×' : '☰';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.classList.contains('visible')) {
        menu.classList.remove('visible');
        menuBtn.textContent = '☰';
    }
});
// Show the button when the user scrolls down 100px
const goToTopButton = document.getElementById('goToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        goToTopButton.style.display = 'block';
    } else {
        goToTopButton.style.display = 'none';
    }
});

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
