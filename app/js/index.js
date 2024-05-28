/*
Usage:  $(<query selector>) -> HTMLElement
        $$(<query selector>) -> HTMLElements[]

Example:    $("div.class-name")
*/
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))


/*
Handle bars integrations script.
*/
const render = async (data) => {
    const templates = $$('[type="text/x-handlebars-template"]')

    for (const source of templates) {
        await loadPartials(source)
        const template = Handlebars.compile(source.innerHTML)
        const target = source.parentElement
        while (target.childElementCount > 1) {
            target.removeChild(target.lastChild)
        }
        target.insertAdjacentHTML('beforeend', template(data))
    }
}


async function loadPartials(code) {
    const partialNames = code.innerText.match(/(?<={{(#>|>)).+?(?=\s)/g)
    if (partialNames) {
        for (let name of partialNames) {
            name = name.trim()
            const fileName = name + '.html'
            const partialCode = await fetch(fileName).then(response => response.text())
            Handlebars.registerPartial(name, partialCode)
        }
    }
}


Handlebars.registerHelper('concat', function (aString, bString) {
    return aString + bString
})


