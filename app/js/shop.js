document.addEventListener('DOMContentLoaded', function () {
    const search_input = $("#search-input")
    const min_price_input = $("#min-price-input")
    const max_price_input = $("#max-price-input")
    const min_size_input = $("#min-size-input")
    const max_size_input = $("#max-size-input")
    const min_weight_input = $("#min-weight-input")
    const max_weight_input = $("#max-weight-input")
    const sort_select = $("#sort-select")
    const shopping_cart_floater = $("#shopping-cart-floater")
    const footer = $("footer")

    
    function setFilterDefaults() {
            
        min_price_input.value = "0"
        // get max satellite price
        max_price_input.value = Math.max(...window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage().map(o => o.price))
        
        min_size_input.value = "0"
        // get max satellite size
        max_size_input.value = Math.max(...window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage().map(o => o.size))
        
        min_weight_input.value = "0"
        // get max satellite weight
        max_weight_input.value = Math.max(...window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage().map(o => o.mass))
        sort_select.value = "name"
    }

    function onAddToCartButton(elem) {
        return (event) => {
            // add to cart button click event
            // add element to cart
            sat_id = parseInt(elem.dataset.satId)
            //quantity = parseInt(elem.parentElement.getElementsByClassName("add-to-cart-count")[0].value)
            quantity = 1 // always add one (hardcoded)
            if (window.shopping_cart_api.getItemById(sat_id)) {
                old_quantity = window.shopping_cart_api.getItemById(sat_id).quantity
                window.shopping_cart_api.updateItemInShoppingCart(
                    target_id = sat_id,
                    item = {
                        id: sat_id,
                        quantity: old_quantity + quantity
                    }
                )
            } else {
                window.shopping_cart_api.addItemToCart({
                    id: sat_id, 
                    quantity: quantity
                })
            }

            renderCatalogue()

            window.showFloatingConfirmation("Added to cart!")
        }
    }

    function renderCatalogue() {
        const all_satellites = window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage()
        const search_query = search_input.value.toLowerCase()

        const filtered_satellites = all_satellites.filter((sat) => {
            matches = (sat.name + sat.desc_short + sat.desc_long).toLowerCase().includes(search_query) &&
                sat.price >= parseInt(min_price_input.value) &&
                sat.price <= parseInt(max_price_input.value) &&
                sat.size >= parseInt(min_size_input.value) &&
                sat.size <= parseInt(max_size_input.value) &&
                sat.mass >= parseInt(min_weight_input.value) &&
                sat.mass <= parseInt(max_weight_input.value) 
            return matches
        })

        const sorted_satellites = filtered_satellites.sort({
            "name": (a, b) => a.name.localeCompare(b.name),
            "price_asc": (a, b) => a.price - b.price,
            "price_desc": (a, b) => b.price - a.price,
            "weight": (a, b) => a.mass - b.mass,
            "size": (a, b) => a.size - b.size,
        }[sort_select.value])

        let cart_total_price = 0
        let cart_total_weight = 0
        window.shopping_cart_api.getShoppingCartFromLocalStorage().forEach(element => {
            const sat = window.product_catalogue_api.getSatelliteDataById(parseInt(element.id))
            cart_total_price += sat.price * parseInt(element.quantity);
            cart_total_weight += sat.mass * parseInt(element.quantity);
        });
        // deal with floating point error
        cart_total_weight = Math.round(cart_total_weight*100)/100 

        render({ satellites: sorted_satellites, cart_total_price: cart_total_price, cart_total_weight: cart_total_weight, navbar_style: 'nav-style-dark', navbar_active: 'shop.html'}).then(() => {

            $$("button.btn-add-to-cart").forEach((elem) => elem.addEventListener("click", onAddToCartButton(elem)))
        })
        
    } // \renderCatalogue


    search_input.addEventListener("input", renderCatalogue)
    $("#save-changes-filter-btn").addEventListener("click", renderCatalogue)
    $("#reset-filter-btn").addEventListener("click", setFilterDefaults)
    setFilterDefaults()
    renderCatalogue()

    // search bar hide and show
    const catalogue_filter_button_row = $(".catalogue-filter-button")
    const catalogue_search_input = $(".catalogue-search-bar input")
    const catalogue_search_bar = $(".catalogue-search-bar")

    // hide filter button only if search is not at max height
    catalogue_search_input.addEventListener("focus", (event) => {
        if (catalogue_search_bar.offsetWidth < 
                parseInt(window.getComputedStyle(catalogue_search_bar,null).getPropertyValue("max-width"))) {
            catalogue_filter_button_row.style.display = "none"
        }
       
    })
    catalogue_search_input.addEventListener("blur", (event) => {
        catalogue_filter_button_row.style.display = "block"
    })
    

})