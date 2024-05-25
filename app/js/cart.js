document.addEventListener('DOMContentLoaded', function () {
    const cart_with_item_ids = window.shopping_cart_api.getShoppingCartFromLocalStorage()
    const cart = []

    // contruct objects for easy handlebars rendering 
    for (const item of cart_with_item_ids) {
        const satellite = window.product_catalogue_api.getSatelliteDataById(parseInt(item.id)) 
        const quantity = item.quantity
        cart.push({satellite, quantity})
    }
    render({cart: cart}).then(() => {
        attachQuantityButtonListeners()
        updateTotalDisplay()
    })


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
    let currentVal = parseInt(inputElement.value)
    currentVal += increment
    const itemId = parseInt(cartItem.querySelector('.cart-item-id').value)
    item = window.shopping_cart_api.getItemById(itemId)

    if (currentVal <= 0) {
        // remove from cart 
        window.shopping_cart_api.deleteItemFromCart(itemId)
        cartItem.remove()
    }
    else {
        // update quantity in html field
        inputElement.value = currentVal
        // update quantity in local storage
        item.quantity = currentVal
        window.shopping_cart_api.updateItemInShoppingCart(itemId, item)
    }
    updateTotalDisplay()
}

function updateTotalDisplay() {
    totalElement = document.getElementById("cart-total")

    let cart = window.shopping_cart_api.getShoppingCartFromLocalStorage()
    sum = 0

    for (const item of cart) {
        const satellite = window.product_catalogue_api.getSatelliteDataById(parseInt(item.id)) 
        const quantity = item.quantity
        sum += quantity * satellite.price
    }
    totalElement.textContent = sum
}



