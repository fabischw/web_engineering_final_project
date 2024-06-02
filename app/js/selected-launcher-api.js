function setSelectedLauncher(launcherId) {
    window.localStorage.setItem("selected-launcher", JSON.stringify(launcherId))
}

function getSelectedLauncher() {
    return JSON.parse(window.localStorage.getItem("selected-launcher"))
}

window.selected_launcher_api = {
    setSelectedLauncher, 
    getSelectedLauncher
}