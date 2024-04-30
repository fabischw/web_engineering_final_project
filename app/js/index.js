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
const render = async (pizzen) => {
    const templates = $$('[type="text/x-handlebars-template"]')
  
    for (const source of templates) {
      await loadPartials(source)
      const template = Handlebars.compile(source.innerHTML)
      const target = source.parentElement
      target.insertAdjacentHTML('beforeend', template(pizzen))
    }
  }

async function loadPartials(source) {
const partialNames = source.innerText.match(/(?<={{>)(.*?)(?=\s|}})/g)
if (partialNames) {
    for (let name of partialNames) {
    name = name.trim()
    const fileName = name + '.html'
    const partialCode = await fetch(fileName).then(response => response.text())
    Handlebars.registerPartial(name, partialCode)
    }
}
}




document.addEventListener('scroll', (event) => {
    console.log("event")
    var scrolled = window.scrollY;
    var parallax_container = $('.parallax-container');
    var coords =  -(scrolled * 0.3) + 'px';
    parallax_container.style.top = coords;
});

handlebars_data = {
    satellites: [
        {
            name: "First"
        }, 
        {
            name: "Second"
        }
    ]
}