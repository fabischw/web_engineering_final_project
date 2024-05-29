document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const orderId = parseInt(urlParams.get('id'))
        render({
            order: window.order_history_api.getOrderById(orderId)
        })
})