document.addEventListener('DOMContentLoaded', function () {
    const form = $('.needs-validation')

    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
    }, false)
    render({ satellites: getSatelliteCatalogueFromLocalStorage(),
        navbar_style: 'nav-style-dark', navbar_active: 'edit-satellite.html' })
    
})

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


function getDataFromForm() {
    return {
        id: null,
        name: document.getElementById('name').value,
        price: parseInt(document.getElementById('price').value),
        size: parseFloat(document.getElementById('size').value),
        mass: parseFloat(document.getElementById('mass').value),
        desc_short: document.getElementById('desc_short').value,
        desc_long: document.getElementById('desc_long').value,
        image: document.getElementById('image').value,
        mode: "admin",
        sat_source: "",
        im_source: ""
    }
}



document.addEventListener('DOMContentLoaded', function () {

    function handleSatelliteUpdate() {
        let id = current_satellite.id
        current_satellite = getDataFromForm()
        current_satellite.id = id

        window.product_catalogue_api.updateSatelliteInCatalogue(current_satellite, id)
        window.location.href = 'admin.html'
    }

    function handleSatelliteAdd() {
        let current_satellite = getDataFromForm()
        if (window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage().length == 0) {
            current_satellite.id = 0
        }
        else {
            current_satellite.id = window.product_catalogue_api.getSatelliteMaximumId() + 1
        }
        window.product_catalogue_api.addSatelliteToCatalogue(current_satellite)
        window.location.href = 'admin.html'
    }


    // cancel button returns to admin page without saving anything
    cancel_btn = document.getElementById('cancel-btn').addEventListener('click', function () {
        window.location.href = 'admin.html'
    })


    // read url params
    let id = parseInt(getUrlParameter('id'))
    let action = getUrlParameter('action')

    // validation logic 
    let form = document.getElementById('edit-satellite-form')
    submit_event = ""


    form.addEventListener('submit', event => {
        event.preventDefault()
        if (form.checkValidity()) {
            event.stopPropagation()
            submit_event()
        }

    }, false)



    // fill out form with existing data, set correct operation for submit event, set correct title for submit button
    let submit_button = document.getElementById('submit-edit-form-btn')
    if (action === "edit") {
        current_satellite = product_catalogue_api.getSatelliteDataById(id)

        document.getElementById('name').value = current_satellite.name
        document.getElementById('price').value = current_satellite.price
        document.getElementById('size').value = current_satellite.size
        document.getElementById('mass').value = current_satellite.mass
        document.getElementById('image').value = current_satellite.image
        document.getElementById('desc_short').value = current_satellite.desc_short
        document.getElementById('desc_long').value = current_satellite.desc_long

        submit_button.textContent = 'Update'
        submit_event = handleSatelliteUpdate
    }
    else if (action == "add") {
        submit_button.textContent = 'Add'
        submit_event = handleSatelliteAdd

    }
})

