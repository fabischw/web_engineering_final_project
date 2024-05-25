document.addEventListener('scroll', (event) => {
    var scrolled = window.scrollY;
    var parallax_container = $('.parallax-container');
    var coords =  -(scrolled * 0.3) + 'px';
    parallax_container.style.top = coords;
});