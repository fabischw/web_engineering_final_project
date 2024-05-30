document.addEventListener('DOMContentLoaded', function () {
    if (!window.localStorage.getItem("launcher-catalogue")) {
        setLauncherCatalogueInLocalStorage(launchers)
    }
})

/**
 * set the launcher_catalogue to the launcher-catalogue key in the local storage    
 * @param {object} catalogue 
 */

function setLauncherCatalogueInLocalStorage(catalogue) {
    window.localStorage.setItem("launcher-catalogue", JSON.stringify(items))
}

/**
 * gets the launchers from local storage
 * @returns launchers
 */
function getLauncherCatalogueFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("order-history"))
}


/**
 * 
 * @param {number} launcher_id 
 * @returns {object} launcher as specified in launcher.js
 */
function getLauncherById(launcher_id) {   
    return getLauncherCatalogueFromLocalStorage().find(x => x.id === launcher_id)
}

window.launcher_catalogue_api = {
    setLauncherCatalogueInLocalStorage, 
    getLauncherCatalogueFromLocalStorage,
    getLauncherById
}