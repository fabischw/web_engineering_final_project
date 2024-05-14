

document.addEventListener('DOMContentLoaded', function () {
    render({ satellites: window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage() })

    const addButton = document.getElementById('add-new-item-button')
    addButton.addEventListener('click', function () {
        window.location.href = 'edit-satellite.html?action=add'
    })

    function attachDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.delete-item-button')  

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', function() {
                const row = this.closest('tr')
                const id_col = row.querySelector('.id-tb-col')
                const id = id_col.textContent.trim()
                window.product_catalogue_api.deleteSatelliteFromCatalogue(id)
                row.remove()
            });
        });
    }

    setTimeout(attachDeleteButtonListeners, 100)
})