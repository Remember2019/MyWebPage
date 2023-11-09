function updateMenuPosition() {
    var menu = document.querySelector('.menu');
    menu.style.top = window.scrollY + 'px';
}

window.addEventListener('scroll', updateMenuPosition);