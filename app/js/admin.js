

document.addEventListener('DOMContentLoaded', function () {
    
    
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
    render({ satellites: window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage() }).then(attachDeleteButtonListeners)

})