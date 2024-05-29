document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = parseInt(urlParams.get('id'))
    currentOrder = window.order_history_api.getOrderById(orderId)
    if (currentOrder) {
        calcTotalPriceForOrder(currentOrder)
    }
    render({
        order: currentOrder
    })
})

function calcTotalPriceForOrder(order) {
    order.totalPrice = 0
    order.cart.forEach(item => {
        order.totalPrice += item.price * item.quantity
    })
}