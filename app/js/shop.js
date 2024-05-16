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

        render({ satellites: filtered_satellites })
    }

    search_input.addEventListener("input", renderCatalogue)

    renderCatalogue()
})