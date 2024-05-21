document.addEventListener('DOMContentLoaded', function () {
    const search_input = document.getElementById("search-input")

    function renderCatalogue() {
        const all_satellites = getSatelliteCatalogueFromLocalStorage()
        const search_query = search_input.value.toLowerCase()

        filtered_satellites = all_satellites.filter((sat) => {
            matches = (sat.name + sat.desc_short + sat.desc_long).toLowerCase().includes(search_query)
            return matches
        })

        console.log(filtered_satellites.length)

        return render({ satellites: filtered_satellites })
    }

    search_input.addEventListener("input", renderCatalogue)

    renderCatalogue().then(() => {
        // executes when catalogue is rendered
        $$("button.btn-add-to-cart").forEach((elem) => elem.addEventListener("click", (event) => {
            // add to cart button click event
            // add element to cart
            sat_id = elem.dataset.satId
            if (window.shopping_cart_api.getItemById(sat_id)) {
                window.shopping_cart_api.updateItemInShoppingCart(
                    target_id = sat_id,
                    item = {
                        id: sat_id,
                        quantity: 1
                    }
                )
            } else {
                window.shopping_cart_api.addItemToCart({
                    id: sat_id, 
                    quantity: 1
                })
            }

            console.log(window.shopping_cart_api.getShoppingCartFromLocalStorage())
            
        }))

    })


})