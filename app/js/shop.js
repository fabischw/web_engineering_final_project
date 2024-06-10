// on dom load
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

    /**
     * Initialize modal filters to correct values
     */
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
        // default sorting style
        sort_select.value = "price_desc"
    }

    /**
     * Add the item to cart on button press.
     * @param {HTMLElement} elem Button element, used for getting satellite id
     */
    function onAddToCartButton(elem) {
        // return callback 
        return (event) => {
            // get satellite id from button element
            sat_id = parseInt(elem.dataset.satId)
            quantity = 1 // always add one (hardcoded)
            // if element is already in cart
            if (window.shopping_cart_api.getItemById(sat_id)) {
                // get old quantity
                old_quantity = window.shopping_cart_api.getItemById(sat_id).quantity
                // update new quantity
                window.shopping_cart_api.updateItemInShoppingCart(
                    target_id = sat_id,
                    item = {
                        id: sat_id,
                        quantity: old_quantity + quantity
                    }
                )
            // if element is not in cart
            } else {
                // add to cart with new quantity
                window.shopping_cart_api.addItemToCart({
                    id: sat_id, 
                    quantity: quantity
                })
            }
            
            // rerender the catalogue to update bottom bar
            renderCatalogue()
            
            // display confirmation dialog
            window.showFloatingConfirmation("Added to cart!")
        }
    }

    /**
     * Render the page using handlebars
     */
    function renderCatalogue() {
        // retrieve all satellites
        const all_satellites = window.product_catalogue_api.getSatelliteCatalogueFromLocalStorage()
        // get search query from input field
        const search_query = search_input.value.toLowerCase()

        // search, filter satellites
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
        
        // sort satellites
        const sorted_satellites = filtered_satellites.sort({
            "name": (a, b) => a.name.localeCompare(b.name),
            "price_asc": (a, b) => a.price - b.price,
            "price_desc": (a, b) => b.price - a.price,
            "weight": (a, b) => a.mass - b.mass,
            "size": (a, b) => a.size - b.size,
        }[sort_select.value])

        // calculate total price and weight
        let cart_total_price = 0
        let cart_total_weight = 0
        // iterate over satellites
        window.shopping_cart_api.getShoppingCartFromLocalStorage().forEach(element => {
            const sat = window.product_catalogue_api.getSatelliteDataById(parseInt(element.id))
            cart_total_price += sat.price * parseInt(element.quantity);
            cart_total_weight += sat.mass * parseInt(element.quantity);
        });

        // deal with floating point error
        cart_total_weight = Math.round(cart_total_weight*100)/100 

        // render
        render({ satellites: sorted_satellites, cart_total_price: cart_total_price, cart_total_weight: cart_total_weight, navbar_style: 'nav-style-light', navbar_active: 'shop.html'}).then(() => {

            // event for add to cart buttons
            $$("button.btn-add-to-cart").forEach((elem) => elem.addEventListener("click", onAddToCartButton(elem)))
        })
        
    } // \renderCatalogue


    // rerender catalogue on search input and filter update 
    search_input.addEventListener("input", renderCatalogue)
    $("#save-changes-filter-btn").addEventListener("click", renderCatalogue)
    $("#reset-filter-btn").addEventListener("click", setFilterDefaults)

    // initialize page
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

    const showFadeOffset = screen.height/20;
    const fade_speed = screen.height / 8;

    // scroll event for background fade in
    function planetOnScroll() {
        // calc target opacity
        const opacity = Math.pow(Math.max((window.scrollY - showFadeOffset) / (fade_speed), 0), 2)
        $("#catalogue-content").style.backgroundColor = "rgba(255, 255, 255, " + opacity + ")";
        $(".bottom-shopping-cart").style.display = (window.scrollY > showFadeOffset * 2) ? "block" : "none"
    }

    document.addEventListener("scroll", planetOnScroll)
    
    // select video element
    var vid = document.getElementById('spinningEarthVideo');

    // pause video on load
    vid.pause();
    let vid_time = 0;

    // value to fine tune effect
    const scroll_for_screen = 0.5;

    // set video time on scoll event
    var renderLoop = function(){
        requestAnimationFrame( function(){
            // only apply effect if video is in view
            if (!isNaN(window.scrollY) && window.scrollY > 0 && (window.scrollY < (screen.height * scroll_for_screen))) {
                const target_time = (window.scrollY / (screen.height * scroll_for_screen)) * vid.duration
                const time_delta = (target_time-vid_time) * 1
                vid_time = vid_time + time_delta
                vid.currentTime = +vid_time.toFixed(1);
            }
            // register new render loop
            renderLoop();
        });
    };
    // start effect when video is fully loaded
    vid.addEventListener("loadeddata", renderLoop)


})