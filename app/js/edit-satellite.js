function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', function () {
    id = parseInt(getUrlParameter('id'))
    action = getUrlParameter('action')

     
    if (action === "edit") {
        current_satellite = product_catalogue_api.getSatelliteDataById(id)

        document.getElementById('name').value = current_satellite.name;
        document.getElementById('price').value = current_satellite.price;
        document.getElementById('size').value = current_satellite.size;
        document.getElementById('mass').value = current_satellite.mass;
        document.getElementById('desc_short').value = current_satellite.desc_short;
        document.getElementById('desc_long').value = current_satellite.desc_long;
    }
})