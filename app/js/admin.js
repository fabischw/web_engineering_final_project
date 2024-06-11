function generate_stats() {
    // Generates stats for the admin page
    satelliteCount = product_catalogue_api.getSatelliteCatalogueFromLocalStorage().length
    launcherCount = launcher_catalogue_api.getLauncherCatalogueFromLocalStorage().length
    orderCount = order_history_api.getOrderHistoryFromLocalStorage().length
    orders = order_history_api.getOrderHistoryFromLocalStorage()
    revenue_cumsum = 0
    orders.forEach(order => {
        order.cart.forEach(entry => {revenue_cumsum += entry.price}) // add satellite prices
        revenue_cumsum += parseInt(order.launcher.price) // add launcher price
    });
    revenue = (revenue_cumsum / 1000000).toFixed(2); // in milion €, rounded to 2 digit precision

    stats = {
        "satelliteCount": satelliteCount,
        "launcherCount": launcherCount,
        "orderCount": orderCount,
        "revenue": revenue
    }

    return stats
}




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


    render({ satellites: window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage() , navbar_active: 'admin.html', stats: generate_stats()}).then(attachDeleteButtonListeners)})
