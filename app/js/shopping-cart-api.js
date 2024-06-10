// the data will be stored in the local storage int the following manner: 
// "shopping-cart": "[{id: number, quantity: number}, {id: number, quantity: number}, ...]"

/**
 * Init shopping cart in local storage if not already set.
 */
document.addEventListener('DOMContentLoaded', function () {
    if (!window.localStorage.getItem("shopping-cart")) {
        
        setShoppingCartInLocalStorage([])
    }
})

function setShoppingCartInLocalStorage(items) {
    window.localStorage.setItem("shopping-cart", JSON.stringify(items))
}

function getShoppingCartFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("shopping-cSart"))
}

function getItemById(target_id) {
    return getShoppingCartFromLocalStorage().find(x => x.id === target_id)
}

/**
 * Update item with target_id.
 * Item should already contain the correct id.
 * @param {number} target_id 
 * @param {object} item 
 */
function updateItemInShoppingCart(target_id, item) {
    items = getShoppingCartFromLocalStorage()
    let index = items.findIndex(x => x.id === target_id)
    items[index] = item
    setShoppingCartInLocalStorage(items)
}

/**
 * add item to cart
 */
function addItemToCart(item) {
    let items = getShoppingCartFromLocalStorage()
    items[items.length] = item
    setShoppingCartInLocalStorage(items)

}

/**
 * remove item with id from cart.
 * @param {number} target_id 
 */
function deleteItemFromCart(target_id) {
    items = getShoppingCartFromLocalStorage()
    let index = items.findIndex(x => x.id === target_id)
    items.splice(index, 1)
    setShoppingCartInLocalStorage(items)
}



// register api methods
window.shopping_cart_api = {
    setShoppingCartInLocalStorage,
    getShoppingCartFromLocalStorage,
    getItemById,
    updateItemInShoppingCart,
    addItemToCart,
    deleteItemFromCart
}


