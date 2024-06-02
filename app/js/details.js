function addToCart(sat_id, quantity) {
    if (window.shopping_cart_api.getItemById(sat_id)) {
        old_quantity = window.shopping_cart_api.getItemById(sat_id).quantity
        window.shopping_cart_api.updateItemInShoppingCart(
            target_id = sat_id,
            item = {
                id: sat_id,
                quantity: old_quantity + quantity
            }
        )
    } else {
        window.shopping_cart_api.addItemToCart({
            id: sat_id, 
            quantity: quantity
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const satelliteID = parseInt(urlParams.get('id'))
    
    render({
        satellite_data: getSatelliteDataById(satelliteID),
        navbar_style: 'nav-style-dark', navbar_active: 'details.html'
    }).then(() => {
        
        const quantityInput = $("#itemQuantity")
        const addToCartButton = $("#addToCartButton")
        const goBackButton = $("#go-back-button")

        addToCartButton.addEventListener("click", (event) => {
            addToCart(satelliteID, parseInt(quantityInput.value))
            window.showFloatingConfirmation("Added to cart!")
        })

        goBackButton.addEventListener("click", (event) => {
            history.back();
        })

    })

})