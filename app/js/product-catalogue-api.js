/**
 * Initialize satellite catalogue in local storage,
 * if not already set.
 */
document.addEventListener('DOMContentLoaded', function () {
    if (!window.localStorage.getItem("satellite-catalogue")) {
        setSatelliteCatlogueInLocalStorage(satellites)
    }
})

function setSatelliteCatlogueInLocalStorage(satellites) {
    window.localStorage.setItem("satellite-catalogue", JSON.stringify(satellites))
}


function getSatelliteCatalogueFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("satellite-catalogue"))
}

function getSatelliteDataById(satellite_id) {   
    return getSatelliteCatalogueFromLocalStorage().find(o => o.id === satellite_id)
}

function getSatelliteMaximumId() {
    const result = Math.max(...getSatelliteCatalogueFromLocalStorage().map(o => o.id))
    return (result < 0) ? 0 : result
}

function updateSatelliteInCatalogue(satellite, target_id) {
    temp_catalogue = getSatelliteCatalogueFromLocalStorage()
    index = temp_catalogue.findIndex(x => x.id === target_id)
    temp_catalogue[index] = satellite
    setSatelliteCatlogueInLocalStorage(temp_catalogue)
}

function addSatelliteToCatalogue(satellite) {
    let satellites = getSatelliteCatalogueFromLocalStorage()
    satellites[satellites.length] = satellite
    setSatelliteCatlogueInLocalStorage(satellites)

}

function deleteSatelliteFromCatalogue(id) {
    temp_catalogue = getSatelliteCatalogueFromLocalStorage()
    index = temp_catalogue.findIndex(x => x.id === id)
    temp_catalogue.splice(index, 1)
    setSatelliteCatlogueInLocalStorage(temp_catalogue)
}

// register api methods
window.product_catalogue_api = {
    getSatelliteCatalogueFromLocalStorage,
    getSatelliteDataById,
    getSatelliteMaximumId,
    updateSatelliteInCatalogue,
    addSatelliteToCatalogue,
    getSatelliteMaximumId,
    deleteSatelliteFromCatalogue
}    
