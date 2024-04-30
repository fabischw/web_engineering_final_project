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
    satellites:[
        {
            name: "KRATOS 1U Cubesat Platform",
            price: 44000,
            descshort: "Ready to-use 1U Cubesat Platform with Solar Arrays",
            desclong: "The KRATOS SCB is completely configurable:  From a modest, standard cubesat to a powerful SpaceTaxi in a 1U that can host up to 6 standard payload boards and 3 cameras delivering up to 100W of power, and LASER communications at 10Mbps. it has everything needed to fly: Onboard computer with pre-installed libraries, SDR Radio with integrated power amplifier, a powerful EPS with 4 power rails, UMPPT Solar management couple to a fast battery charger, Deployable Multifunction Solar Arrays, automated deploy/release control to up to 4 devices, embedded monopole and dipole antennas from  VHF to L band, embedded magnetorquers, temperature and sun sensors in all walls, ADCS control with integrated Z axis magnetorquer, high power batteries, radiation hardened SSD storage and even LASER communications at 10Mbps minimum.",
            weight: 15,
            image: "https://static.wixstatic.com/media/4249fe_9c5689db44934412961068f5a1f8434b~mv2.jpg/v1/fit/w_1000,h_1000,q_90/4249fe_9c5689db44934412961068f5a1f8434b~mv2.jpg",
        },
        {
            name: "Endurosat 1U Cubesat Platform",
            price: 55800,
            descshort: "Flight-proven fully integrated CubeSat bus with unmatched payload capacity in the 1U class",
            desclong: "",
            weight: 10,
            image: "https://www.endurosat.com/wp-content/uploads/2020/11/1u-cubesat-platform-endurosat-nanosatellite-cropped-01-min-1024x1024-1.webp",
        }
    ]
}