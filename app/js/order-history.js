document.addEventListener('DOMContentLoaded', function () {
    render({ orders: window.order_history_api.getOrderHistoryFromLocalStorage() })
})