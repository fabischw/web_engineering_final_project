document.addEventListener('DOMContentLoaded', function () {
    const cart_with_item_ids = window.shopping_cart_api.getShoppingCartFromLocalStorage()
    const cart = []
    let total_price = 0;

    // contruct objects for easy handlebars rendering 
    for (const item of cart_with_item_ids) {
        const satellite = window.product_catalogue_api.getSatelliteDataById(parseInt(item.id)) 
        const quantity = item.quantity
        const item_total_price = parseInt(quantity) * parseInt(satellite.price)
        total_price += item_total_price;
        cart.push({satellite, quantity, total_price: item_total_price})
    }
    render({cart: cart, total_price: total_price, navbar_style: 'nav-style-dark', navbar_active: 'checkout.html'}).then(() => {
        // pass
        const goBackButton = $("#go-back-button")
        
        goBackButton.addEventListener("click", (event) => {
            history.back();
        })
    })


})