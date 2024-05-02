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





