// the data will be stored in the local storage int the following manner: 
// "shopping-cart": "[{id: number, quantity: number}, {id: number, quantity: number}, ...]"

document.addEventListener('DOMContentLoaded', function () {
    if (!window.localStorage.getItem("shopping-cart")) {
        
        setShoppingCartInLocalStorage([])
    }
})

function setShoppingCartInLocalStorage(items) {
    window.localStorage.setItem("shopping-cart", JSON.stringify(items))
}

function getShoppingCartFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("shopping-cart"))
}

function getItemById(target_id) {
    let items = getShoppingCartFromLocalStorage()
    return items[items.findIndex(x => x.id === target_id)]
}

// the item should also contain the correct id
function updateItemInShoppingCart(target_id, item) {
    items = getShoppingCartFromLocalStorage()
    let index = items.findIndex(x => x.id === target_id)
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
    getItemById,
    updateItemInShoppingCart,
    addItemToCart,
    deleteItemFromCart
}


