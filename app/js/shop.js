document.addEventListener('DOMContentLoaded', function () {
    const search_input = $("#search-input")
    const min_price_input = $("#min-price-input")
    const max_price_input = $("#max-price-input")
    const min_size_input = $("#min-size-input")
    const max_size_input = $("#max-size-input")
    const min_weight_input = $("#min-weight-input")
    const max_weight_input = $("#max-weight-input")
    const sort_select = $("#sort-select")

    
    function set_filter_defaults() {
            
        min_price_input.value = "0"
        // get max satellite price
        max_price_input.value = Math.max(...getSatelliteCatalogueFromLocalStorage().map(o => o.price))
        
        min_size_input.value = "0"
        // get max satellite size
        max_size_input.value = Math.max(...getSatelliteCatalogueFromLocalStorage().map(o => o.size))
        
        min_weight_input.value = "0"
        // get max satellite weight
        max_weight_input.value = Math.max(...getSatelliteCatalogueFromLocalStorage().map(o => o.mass))
        sort_select.value = "name"
    }

    function renderCatalogue() {
        const all_satellites = getSatelliteCatalogueFromLocalStorage()
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

        render({ satellites: sorted_satellites }).then(() => {

            $$("button.btn-add-to-cart").forEach((elem) => elem.addEventListener("click", (event) => {
                // add to cart button click event
                // add element to cart
                sat_id = elem.dataset.satId
                quantity = elem.parentElement.getElementsByClassName("add-to-cart-count")[0].value
                console.log("Adding to cart id="+sat_id+" quantitity="+quantity)
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

            }))
        })
        
    }


    search_input.addEventListener("input", renderCatalogue)
    $("#save-changes-filter-btn").addEventListener("click", renderCatalogue)
    $("#reset-filter-btn").addEventListener("click", set_filter_defaults)
    set_filter_defaults()
    renderCatalogue()


})