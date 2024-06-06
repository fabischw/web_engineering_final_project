

document.addEventListener('DOMContentLoaded', function () {
    
    
    function attachDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.delete-item-button')  
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', function() {
                const row = this.closest('tr')
                const id_col = row.querySelector('.id-tb-col')
                const id = id_col.textContent.trim()
                window.product_catalogue_api.deleteSatelliteFromCatalogue(id)
                window.shopping_cart_api.deleteItemFromCart(id)
                row.remove()
                window.showFloatingConfirmation("Entry removed successfully.")
            });
        });
    }
    render({ satellites: window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage() , navbar_active: 'admin.html'}).then(attachDeleteButtonListeners)

})