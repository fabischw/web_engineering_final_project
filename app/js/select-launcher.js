document.addEventListener('DOMContentLoaded', function () {
    render({launchers: getLauncherSelection()}).then(() => {
        attachLaunchSelfButtonListener()
        attachSelectButtonListener()
        attachSelectCardListerners()
    })
})

/**
 *  calculates the total weight of the cart
 * @returns totalWeight
 */
function calcTotalWeightOfCart() {
    items = window.shopping_cart_api.getShoppingCartFromLocalStorage()
    totalWeight = 0

    items.forEach(item => {
        totalWeight += item.quantity * window.product_catalogue_api.getSatelliteDataById(item.id).mass
    })

    return totalWeight
}


/**
 * gets the cheapest launcher from an array of launchers
 * @param {Array} selectedLaunchers 
 * @returns {Launcher} cheapestLauncher
 */
function getCheapestLauncher(selectedLaunchers) {
    return selectedLaunchers.reduce((cheapest, launcher) => {
        return parseInt(launcher.launch_cost) <  parseInt(cheapest.launch_cost) ? launcher : cheapest
    }, selectedLaunchers[0])
}

/**
 * gets the launcher with most successfull launchersfrom an array of launchers
 * @param {Array} selectedLaunchers 
 * @returns {Launcher} cheapestLauncher
 */
function getLauncherWithMostSuccessfulLaunches(selectedLaunchers) {
    return selectedLaunchers.reduce((mostSuccessful, launcher) => {
        return launcher.successful_launches > mostSuccessful.successful_launches ? launcher : mostSuccessful
    }, selectedLaunchers[0])
}

/**
 * gets the 'newst' launcher from an array of launchers
 * @param {Array} selectedLaunchers 
 * @returns {Launcher} cheapestLauncher
 */
function getLauncherWithMostRecentMaidenFlight(launchers) {
    return launchers.reduce((mostRecent, launcher) => {
        return new Date(launcher.maiden_flight) > new Date(mostRecent.maiden_flight) ? launcher : mostRecent
    }, launchers[0])
}


/**
 * returns random launcher and pops the element from list
 * @param {*} launcherList 
 * @returns single launcher
 */
function getRandomLauncher(launcherList) {
    index = Math.floor(Math.random()*launcherList.length)
    launcher = launcherList[index]
    launcherList.splice(index, 1)
    return launcher
}



/** Launcher Selection Algorithm
 *  selects up to 3 launchers to be chosen by the customer
 *  the algorithm provides unique launchers and assigns tags while trying to avoid duplicate launchers and tags
 * @returns finalLauncherSelection
 */
function getLauncherSelection() {
    /**
     * This algorithm uses the 3 functions getCheapestLauncher, getLauncherWithMostSuccessfulLaunches, getLauncherWithMostRecentMaidenFlight
     * to determine the tags for the offers shown.
     * 'Most reliable' tag is calculated by most successfull laucnhes, NOT success rate as success rates are misleading in spaceflight
     * 'Cheapest' is the cheapest launcher
     * 'Newcomer' is the launcher with the most recent maiden flight
     * 'Best value' is used when a Launcher is the cheapest and most reliable. These two tags are then overwritten.
     * It's important to acknowledge that these tags are always relative to the pool of launchers available for the payload and not global.
     * This means a user will always see tagged offers.
     */
    launcherCatalogue = window.launcher_catalogue_api.getLauncherCatalogueFromLocalStorage()
    finalLauncherSelection  = []
    // remove all launchers from list, which do not match payload requirements      
    const totalWeight = calcTotalWeightOfCart()

    // select launchers that fit payload requirement (scale down by 100 to try and mimic rideshare capacity)
    launchersAfterPayloadSelection = launcherCatalogue.filter(launcher => launcher.leo_capacity / 100 >= totalWeight)  
    
    if (launchersAfterPayloadSelection.length === 0) { // edge case one: no launcher fits requirements
        finalLauncherSelection = []
    }

    else if (launchersAfterPayloadSelection.length === 1) { // edge case two: only one launcher fits requirements -> no selection
        finalLauncherSelection = launchersAfterPayloadSelection
    }
    else if (launchersAfterPayloadSelection.length === 2) { // edge case three: only two launcher fit requirements -> tag most reliable
        // add tag to most reliable and remove from array
        mostReliableLauncher = getLauncherWithMostSuccessfulLaunches(launchersAfterPayloadSelection)
        launchersAfterPayloadSelection.splice(launchersAfterPayloadSelection.indexOf(mostReliableLauncher), 1)
        mostReliableLauncher.tags = [{name: "Most reliable", color: "#018e1d"}]

        // fuse overall array again
        finalLauncherSelection = [mostReliableLauncher, launchersAfterPayloadSelection[0]]
    }
    else {
        // algorithm start. First get most reliable launcher
        ran_launchers = 0
        most_reliable = getLauncherWithMostSuccessfulLaunches(launchersAfterPayloadSelection)
        most_reliable.tags = [{name: "Most reliable", color: "green"}] //assign tags
        finalLauncherSelection.push(most_reliable)
        cheapest = getCheapestLauncher(launchersAfterPayloadSelection) // 2. step, find cheap launcher
        if (cheapest.id == most_reliable.id) {
            ran_launchers += 1 // avoid dupe launcher if cheapest and most reliable are the same
            finalLauncherSelection[0].tags[0] = {name: "Best value", color: "purple"} // most reliable + cheapest = best value

            newcomer = getLauncherWithMostRecentMaidenFlight(launchersAfterPayloadSelection) //find newcomer
            if (newcomer.id == most_reliable.id) {
                ran_launchers += 1
                finalLauncherSelection[0].tags.push({name: "Newcomer", color: "orange"})
            }
            else {
                newcomer.tags = [{name: "Newcomer", color: "orange"}]
                finalLauncherSelection.push(newcomer)
            }
        }
        else { // 2 dif launchers
            cheapest.tags = [{name: "Cheapest", color: "blue"}]
            finalLauncherSelection.push(cheapest)

            newcomer = getLauncherWithMostRecentMaidenFlight(launchersAfterPayloadSelection)
            if (newcomer.id == most_reliable.id) { // dupe in 2. case
                ran_launchers += 1
                finalLauncherSelection[0].tags.push({name: "Newcomer", color: "orange"})
            }
            else {
                if (newcomer.id == cheapest.id) { //dupe handling
                    ran_launchers += 1
                    finalLauncherSelection[1].tags.push({name: "Newcomer", color: "orange"})
                }
                else { // all 3 tags are spread on 3 different launchers
                    newcomer.tags = [{name: "Newcomer", color: "orange"}]
                    finalLauncherSelection.push(newcomer)
                }
            }

        }

        // take already picked launchers out of available laucher pool
        launchersAfterTagSelection = launchersAfterPayloadSelection
        finalLauncherSelection.forEach(launcher => {
            launchersAfterTagSelection.splice(launchersAfterTagSelection.indexOf(launcher), 1)
        })

        // generate ran_launchers
        for (let i = 0; i < ran_launchers; i++) {
            finalLauncherSelection.push(getRandomLauncher(launchersAfterTagSelection))
        }

    }

    return finalLauncherSelection
}


let selectedLauncher = null


function attachSelectCardListerners() {
    $$(".launcher-card").forEach(card => {
        card.addEventListener("click", event => {
            
            if (selectedLauncher != null) {
                selectedLauncher.classList.remove("launcher-card-selected")
            }
            else {
                // enable select button
                $("#select-btn").toggleAttribute("disabled")
            }
            selectedLauncher = card
            card.classList.add("launcher-card-selected")
        })
    })
}

function attachSelectButtonListener() {
    $("#select-btn").addEventListener("click", () => {
        window.selected_launcher_api.setSelectedLauncher(selectedLauncher.dataset.id)
        window.location.href = "cart.html"
    })
}

function attachLaunchSelfButtonListener() {
    $("#launch-yourself-btn").addEventListener("click", () => {
        window.selected_launcher_api.setSelectedLauncher(-1)
        window.location.href = "cart.html"
    })
}


