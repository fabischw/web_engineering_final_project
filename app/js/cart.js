document.addEventListener('DOMContentLoaded', function () {
    const cart_with_item_ids = window.shopping_cart_api.getShoppingCartFromLocalStorage()
    const cart = []

    // contruct objects for easy handlebars rendering 
    for (const item of cart_with_item_ids) {
        const satellite = window.product_catalogue_api.getSatelliteDataById(item.id) 
        const quantity = item.quantity
        cart.push({satellite, quantity})
    }
    render({cart: cart}).then(attachQuantityButtonListeners)


})

/**
 * attaches updateQuantity to each subtract and add button with the correct params
 */
function attachQuantityButtonListeners() {
    const buttons = document.querySelectorAll('.quantity-btn')  
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const cartItem = event.target.closest('.cart-item')
            const inputElement = event.target.parentElement.querySelector('.item-quantity')
            const increment = event.target.classList.contains('add-quantity') ? 1 : -1
            updateQuantity(inputElement, increment, cartItem)
        })
    })
}

/**
 * Updates quantity in input element and removes it from cart if quantity reaches zero
 * @param {object} inputElement 
 * @param {number} increment 
 */
function updateQuantity(inputElement, increment, cartItem) {
    let current_val = parseInt(inputElement.value)
    current_val += increment
    const itemId = parseInt(cartItem.querySelector('.cart-item-id').value)
    item = window.shopping_cart_api.getItemById(itemId)

    if (current_val <= 0) {
        // remove from cart 
        window.shopping_cart_api.deleteItemFromCart(itemId)
        cartItem.remove()
    }
    else {
        // update quantity in html field
        inputElement.value = current_val
        // update quantity in local storage
        item.quantity = current_val
        window.shopping_cart_api.updateItemInShoppingCart(itemId, item)
    }
}

