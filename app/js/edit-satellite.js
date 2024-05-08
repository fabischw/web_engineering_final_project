function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', function() {
    id = getUrlParameter('id')
    console.log(id)
    action = getUrlParameter('action')

    current_satellite = product_catalogue_api.getSatelliteDataById(id)
    console.log(this.current_satellite)
})