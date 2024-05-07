if (!window.localStorage.getItem("satellite-catalogue")) {
    window.localStorage.setItem("satellite-catalogue", JSON.stringify(satellites)) 
}


function getSatellitesCatalogueFromLocalStorage() {
    console.log(JSON.parse(window.localStorage.getItem("satellite-catalogue")))
    return JSON.parse(window.localStorage.getItem("satellite-catalogue"))
}

function addToSatellitesCatalogueInLocalStorage () {
    satellites = getSatellitesCatalogueFromLocalStorage()
    
}

