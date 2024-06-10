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
        
        const goBackButton = $("#go-back-button")
        goBackButton.addEventListener("click", (event) => {
            history.back();
        })
        
        if (window.product_catalogue_api.getSatelliteDataById(satelliteID)) {
            const quantityInput = $("#itemQuantity")
            const addToCartButton = $("#addToCartButton")
            
            addToCartButton.addEventListener("click", (event) => {
                quantity = parseInt(quantityInput.value);
                // check if input is correct
                if (!isNaN(quantity) && quantity > 0) {
                    addToCart(satelliteID, quantity)
                    window.showFloatingConfirmation("Added to cart!")
                } else {
                    // if not correct reset to 0;
                    quantityInput.value = 0
                }
            })
        }


    })

})