document.addEventListener('DOMContentLoaded', function () {
    orderHistory = window.order_history_api.getOrderHistoryFromLocalStorage()
    calcTotalPriceForEachOrder(orderHistory)
    console.log(orderHistory)
    render({orders: orderHistory})
})

function calcTotalPriceForEachOrder(orderHistory) {
    orderHistory.forEach(order => {
        order.totalPrice = 0
        order.cart.forEach(item => {
            order.totalPrice += item.price * item.quantity
        })
    })
}