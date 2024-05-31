document.addEventListener('DOMContentLoaded', function () {
    render({launchers: getLauncherSelection()}).then(attachSelectButtonListerners)
})


function calcTotalWeightOfCart() {
    items = window.shopping_cart_api.getShoppingCartFromLocalStorage()
    totalWeight = 0

    items.forEach(item => {
        totalWeight += item.quantity * window.product_catalogue_api.getSatelliteDataById(item.id).mass
    })

    return totalWeight
}



function getCheapestLauncher(selectedLaunchers) {
    return selectedLaunchers.reduce((cheapest, launcher) => {
        return parseInt(launcher.launch_cost) <  parseInt(cheapest.launch_cost) ? launcher : cheapest
    }, selectedLaunchers[0])
}

function getLauncherWithMostSuccessfulLaunches(selectedLaunchers) {
    return selectedLaunchers.reduce((mostSuccessful, launcher) => {
        return launcher.successful_launches > mostSuccessful.successful_launches ? launcher : mostSuccessful
    }, selectedLaunchers[0])
}


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


// Launcher Selection Algorithm V0.1
function getLauncherSelection() {
    launcherCatalogue = window.launcher_catalogue_api.getLauncherCatalogueFromLocalStorage()
    finalLauncherSelection  = []
    // remove all launchers from list, which do not match payload requirements      
    const totalWeight = calcTotalWeightOfCart()

    // this is because rockets are typically right share
    launchersAfterPayloadSelection = launcherCatalogue.filter(launcher => launcher.leo_capacity / 100 >= totalWeight)  
    
    if (launchersAfterPayloadSelection.length === 0) {
        finalLauncherSelection = []
    }

    else if (launchersAfterPayloadSelection.length === 1) {
        finalLauncherSelection = launchersAfterPayloadSelection
    }
    else if (launchersAfterPayloadSelection.length === 2) {
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
        most_reliable.tags = [{name: "Most reliable", color: "green"}]
        finalLauncherSelection.push(most_reliable)
        cheapest = getCheapestLauncher(launchersAfterPayloadSelection)
        if (cheapest.id == most_reliable.id) {
            ran_launchers += 1
            finalLauncherSelection[0].tags[0] = {name: "Best value", color: "purple"}

            newcomer = getLauncherWithMostRecentMaidenFlight(launchersAfterPayloadSelection)
            if (newcomer.id == most_reliable.id) {
                ran_launchers += 1
                finalLauncherSelection[0].tags.push({name: "Newcomer", color: "orange"})
            }
            else {
                newcomer.tags = [{name: "Newcomer", color: "orange"}]
                finalLauncherSelection.push(newcomer)
            }
        }
        else {
            cheapest.tags = [{name: "Cheapest", color: "blue"}]
            finalLauncherSelection.push(cheapest)

            newcomer = getLauncherWithMostRecentMaidenFlight(launchersAfterPayloadSelection)
            if (newcomer.id == most_reliable.id) {
                ran_launchers += 1
                finalLauncherSelection[0].tags.push({name: "Newcomer", color: "orange"})
            }
            else {
                if (newcomer.id == cheapest.id) {
                    ran_launchers += 1
                    finalLauncherSelection[1].tags.push({name: "Newcomer", color: "orange"})
                }
                else {
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

function attachSelectButtonListerners() {
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
    $("#select-button").addEventListener("click", () => {
        window.
    })
}


