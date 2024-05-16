// the data will be stored in the local storage int the following manner: 
// "shopping-cart": "[{id: number, quantity: number}, {id: number, quantity: number}, ...]"

function setShoppingCartInLocalStorage(items) {
    window.localStorage.setItem("shopping-cart", JSON.stringify(items))
}

function getShoppingCartFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("shopping-cart"))
}


function updateQuantityOfItemInShoppingCart(quantity, target_id) {
    items = getShoppingCartFromLocalStorage()
    let index = items.findIndex(x => x.id === target_id)
    item = items[index] 
    item.quantity = quantity
    items[index] = item
    setShoppingCartInLocalStorage(items)
}

function addItemToCart(item) {
    let items = getShoppingCartFromLocalStorage()
    items[items.length] = item
    setShoppingCartInLocalStorage(items)

}

function deleteItemFromCart(target_id) {
    items = getShoppingCartFromLocalStorage()
    let index = items.findIndex(x => x.id === target_id)
    items.splice(index, 1)
    setShoppingCartInLocalStorage(items)
}


window.shopping_cart_api = {
    setShoppingCartInLocalStorage,
    getShoppingCartFromLocalStorage,
    updateQuantityOfItemInShoppingCart,
    addItemToCart,
    deleteItemFromCart
}


