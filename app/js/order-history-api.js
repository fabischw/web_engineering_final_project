/*
[order1, order2, ..., orderN]

This is what an order item looks like.

order: {
    id: number,
    cart: [
        {
            name: string,
            price: number,
            quantity: number
        }
    ], 
    billing: {
        firstName, 
        lastName, 
        email: string, 
        phone: string,
        company: string,
        address: {
            country: string,
            postcode: string,
            city: string,
            street: string,
            nr: number,
            addressAddition: string
    },
    date: "DD.MM.YYYY"
    }
}

*/



// init oder history on document load
document.addEventListener('DOMContentLoaded', function () {
    if (!window.localStorage.getItem("order-history")) {
        setOrderHistoryInLocalStorage([])
    }
})

/**
 * set the array of orders to the order-history key in the local storage    
 * @param {order[]} items 
 */

function setOrderHistoryInLocalStorage(items) {
    window.localStorage.setItem("order-history", JSON.stringify(items))
}

/**
 * gets the array of past orders from the order-history key in local storage
 * @returns order[]
 */
function getOrderHistoryFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("order-history"))
}

/**
 * adds an order item to the array in the local storage
 * @param {order} item 
 */
function addItemToOrderHistory(item) {
    let items = getOrderHistoryFromLocalStorage()
    items.push(item)
    setOrderHistoryInLocalStorage(items)
}

window.order_history_api = {
    setOrderHistoryInLocalStorage,
    getOrderHistoryFromLocalStorage,
    addItemToOrderHistory
}
