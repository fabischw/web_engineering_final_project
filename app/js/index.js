/*
Usage:  $(<query selector>) -> HTMLElement
        $$(<query selector>) -> HTMLElements[]

Example:    $("div.class-name")
*/
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))

/*
Add Event listener to all elements matching css selector.
*/
const $on = (element, event, func) => {
    Array.isArray(element)
        ? element.forEach(arrayElement => $on(arrayElement, event, func))
        : element.addEventListener(event, func)
    return element
}

/*
Handle bars integrations script.
*/
const render = (data) => {
    const templates = $$('[type="text/x-handlebars-template"]')

    for (const source of templates) {
        const template = Handlebars.compile(source.innerHTML)
        const target = source.nextElementSibling
        target.innerHTML = template(data)
    }
}




document.addEventListener('scroll', (event) => {
    var scrolled = window.scrollY;
    var parallax_container = $('.parallax-container');
    var coords =  -(scrolled * 0.3) + 'px';
    parallax_container.style.top = coords;
});