if (!window.localStorage.getItem("satellite-catalogue")) {
    window.localStorage.setItem("satellite-catalogue", JSON.stringify(satellites)) 
}


function getSatellitesCatalogueFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("satellite-catalogue"));
}