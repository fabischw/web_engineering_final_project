/**
 * @param {number} launcherId 
 */
function setSelectedLauncher(launcherId) {
    window.localStorage.setItem("selected-launcher", JSON.stringify(launcherId))
}

/**
 * @returns {String} idOfSelectedLauncher
 */
function getSelectedLauncher() {
    return JSON.parse(window.localStorage.getItem("selected-launcher"))
}

window.selected_launcher_api = {
    setSelectedLauncher, 
    getSelectedLauncher
}