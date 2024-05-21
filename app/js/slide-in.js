document.addEventListener("DOMContentLoaded", function () {
    const textElements = document.querySelectorAll('.slide-in')

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in')
                observer.unobserve(entry.target) // Stop observing after animation starts
            }
        })
    }, { threshold: 0.1 })

    textElements.forEach(element => {
        observer.observe(element)
    })
})