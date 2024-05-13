document.addEventListener('DOMContentLoaded', function () {
    render({ satellites: window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage() })

    const addButton = document.getElementById('add-new-item-button')
    addButton.addEventListener('click', function () {
        window.location.href = 'edit-satellite.html?action=add'
    })

    const deleteButton = document.getElementById('delete-item-button')
    deleteButton.addEventListener('click', function() {
        console.log("test")
    })
})