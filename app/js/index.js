/*
Usage:  $(<query selector>) -> HTMLElement
        $$(<query selector>) -> HTMLElements[]

Example:    $("div.class-name")
*/
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))
const ride_share_price_scale = 40

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


/**
 * Handlebars Helper Function:
 * combines two strings.
 */
Handlebars.registerHelper('concat', function (aString, bString) {
    return aString + bString
})

/**
 * Formats a price with seperators and euro symbol using regex.
 * @param {(string|number)} price 
 * @returns {string} the formatted price
 */
window.formatPriceTag = (price) => {
    return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + "€";
}

/**
 * Handlebars Helper Function:
 * makes the previous function available in handlebars.
 */
Handlebars.registerHelper('formatPrice', (aString) => {
    return window.formatPriceTag(aString)
})

/**
 * If the first two arguments are equal, return the third argument.
 * Else return an empty string.
 */
Handlebars.registerHelper('ifEquals', function(arg1, arg2, insertText) {
    return (arg1 == arg2) ? insertText : "";
})

/**
 * Calculates the ride share price for displaying launcher prices.
 */
Handlebars.registerHelper('scale_ride_share_price', function(price) {
    price = parseInt(price) / ride_share_price_scale
    return Math.trunc(price*Math.pow(10, 0))/Math.pow(10, 0)
})
/**
 * Calculates ride share savings.
 */
Handlebars.registerHelper('calculateRideshareSaving', function(price) {
    price = parseInt(price) - parseInt(price) / ride_share_price_scale
    return Math.trunc(price*Math.pow(10, 0))/Math.pow(10, 0)
})
