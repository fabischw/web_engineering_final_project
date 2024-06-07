document.addEventListener('DOMContentLoaded', function () {
    // contruct objects for easy handlebars rendering 
    const cart = generateCartWithPrices()
    let total_price = calcCartTotalPrice()
    
    const form = document.checkoutForm
    
    form.addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
            performCheckout(new FormData(form))
            window.location.href = "thankyou.html"
        } 
        form.classList.add('was-validated')
    }, false)
    
    const launcherId = parseInt(window.selected_launcher_api.getSelectedLauncher())
    const launcher = window.launcher_catalogue_api.getLauncherById(launcherId)
    // ride share scale
    total_price += launcher.launch_cost / 40


    render({cart: cart, total_price: total_price, launcher: launcher, navbar_style: 'nav-style-dark', navbar_active: 'checkout.html'}).then(() => {
        // pass
        const goBackButton = $("#go-back-button")
        
        goBackButton.addEventListener("click", (event) => {
            history.back();
        })
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

function generateLauncherObject() {
    launcherId = parseInt(window.selected_launcher_api.getSelectedLauncher())
    let launcher
    if (launcherId === -1) {
        launcher = {"name": "Self-launch", "price": 0}
    }
    else {
        temp = window.window.launcher_catalogue_api.getLauncherById(launcherId)
        launcher = {"name": temp.name, "price": temp.launch_cost}
    }
    return launcher
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
        "launcher": generateLauncherObject(),
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
    // clear laucher
    window.selected_launcher_api.setSelectedLauncher("")
}