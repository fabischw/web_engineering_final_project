document.addEventListener('DOMContentLoaded', function () {
    orderHistory = window.order_history_api.getOrderHistoryFromLocalStorage()
    calcTotalPriceForEachOrder(orderHistory)
    render({orders: orderHistory, navbar_style: 'nav-style-dark', navbar_active: 'order-history.html'})
})

function calcTotalPriceForEachOrder(orderHistory) {
    orderHistory.forEach(order => {
        order.totalPrice = 0
        order.cart.forEach(item => {
            order.totalPrice += item.price
        })
        order.totalPrice += order.launcher.price
    })
}