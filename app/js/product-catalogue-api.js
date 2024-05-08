if (!window.localStorage.getItem("satellite-catalogue")) {
    window.localStorage.setItem("satellite-catalogue", JSON.stringify(satellites)) 
}


function getSatellitesCatalogueFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("satellite-catalogue"));
}

function getSatelliteDataById(satellite_id) {

    return getSatellitesCatalogueFromLocalStorage().find(o => o.id === satellite_id);
}

function getSatelliteMaximumId() {
    return Math.max(...getSatellitesCatalogueFromLocalStorage().map(o => o.id))
}

window.product_catalogue_api = {
    getSatellitesCatalogueFromLocalStorage,
    getSatelliteDataById,
    getSatelliteMaximumId
}    
