// [order1, order2]

// order: {
//     cart: {
//         item: {
//             name: string,
//             price: number,
//             quantity: number
//         }
//     }, 
//     quantity: number,
//     billing: {
//         first_name, 
//         last_name, 
//         email: string, 
//         phone: string,
//         company: string,
//         address: {
//             country: string,
//             postcode: string,
//             city: string,
//             street: string,
//             nr: number,
//             address-addition: string
//         }
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    if (!window.localStorage.getItem("order-history")) {
        setOrderHistoryInLocalStorage([])
    }
})

function setOrderHistoryInLocalStorage(items) {
    window.localStorage.setItem("order-history", JSON.stringify(items))
}

function getOrderHistoryFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("order-history"))
}

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
