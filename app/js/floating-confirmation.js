let floatingConfirmationHTML;   // stores html of floating confirmation dialog
// fetches the html code from another file 
fetch("partials/floating-confirmation.html").then((response) => {
    if (response.status === 200) {
        return response.text()
    }
}).then((html) => {
    floatingConfirmationHTML = html
})

const fade_after = 2*1000   // start fading out the dialog after this delay

/**
 * Display a floating confirmation dialog containing the message text.
 * @param {string} msg_text The text to be displayed.
 */
window.showFloatingConfirmation = (msg_text) => {
    // create the dom element
    const confirmation_element = document.createElement("div")
    // fill it with html content
    confirmation_element.innerHTML = floatingConfirmationHTML
    // add element to dom
    document.body.appendChild(confirmation_element)
    // select relevant child elements
    const floater = confirmation_element.querySelector(".float-add-confirmation")
    // set message text
    confirmation_element.querySelector(".float-confirmation-text").textContent = msg_text
    setTimeout(() => {
        // move element into view
        floater.style.bottom = "4.5rem";
    }, 1)
    setTimeout(() => {
        // start fading out element
        floater.style.opacity = "0";
    }, fade_after)
    setTimeout(() => {
        // remove dialog from dom
        document.body.removeChild(confirmation_element)
    }, fade_after + 5*1000)

}