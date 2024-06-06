document.addEventListener('DOMContentLoaded', function () {
    // contruct objects for easy handlebars rendering 
    const cart = generateCartWithPrices()
    let total_price = calcCartTotalPrice();



    render({cart: cart, is_cart_empty: (cart.length === 0), total_price: total_price, navbar_style: 'nav-style-dark', navbar_active: 'checkout.html'}).then(() => {
        // pass
        const goBackButton = $("#go-back-button")
        
        goBackButton.addEventListener("click", (event) => {
            history.back();
        })
    }).then(() => {
        if ((cart.length > 0)) {
            const form = document.checkoutForm

            form.addEventListener('submit', event => {
                event.preventDefault()
                event.stopPropagation()
                if ((window.shopping_cart_api.getShoppingCartFromLocalStorage().length > 0) 
                    && form.checkValidity()) {
                    performCheckout(new FormData(form))
                    window.location.href = "thankyou.html"
                } 
                form.classList.add('was-validated')
            }, false)
        }
    })


})

function generateCartWithPrices() {
    const cart_with_item_ids = window.shopping_cart_api.getShoppingCartFromLocalStorage()
    let result_cart = []
    
    for (const item of cart_with_item_ids) {
        const satellite = window.product_catalogue_api.getSatelliteDataById(parseInt(item.id)) 
        const quantity = item.quantity
        const item_total_price = parseInt(quantity) * parseInt(satellite.price)
        result_cart.push({name: satellite.name, quantity: quantity, price: item_total_price})
    }
    return result_cart;
}

function calcCartTotalPrice() {
    let total_price = 0
    generateCartWithPrices().forEach((cart_item) => {
        total_price += cart_item.price
    })
    return total_price
}

function performCheckout(formData) {
    const now = new Date();
    const date_string = now.getDate()+"."+(now.getMonth()+1)+"."+now.getFullYear()
    window.order_history_api.addItemToOrderHistory({
        "id": window.order_history_api.getOrderHistoryMaximumId() + 1,
        "cart": generateCartWithPrices(),
        "date": date_string,
        "billing": {
            "firstName": formData.get("first_name"),
            "lastName": formData.get("last_name"),
            "email": formData.get("email"),
            "phone": formData.get("phone"),
            "company": formData.get("company"),
            "address": {
                "country": formData.get("country"),
                "postcode": formData.get("postcode"),
                "city": formData.get("city"),
                "street": formData.get("street"),
                "nr": formData.get("nr"),
                "addressAddition": formData.get("address_addition")
            }
        }
    })
    // clear cart
    window.shopping_cart_api.setShoppingCartInLocalStorage([])
}