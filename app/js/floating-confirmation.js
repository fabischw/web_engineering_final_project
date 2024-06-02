let floatingConfirmationHTML;
fetch("partials/floating-confirmation.html").then((response) => response.text()).then((html) => {
    floatingConfirmationHTML = html
})

const fade_after = 2*1000

window.showFloatingConfirmation = (msg_text) => {
    const confirmation_element = document.createElement("div")
    confirmation_element.innerHTML = floatingConfirmationHTML
    document.body.appendChild(confirmation_element)
    const floater = confirmation_element.querySelector(".float-add-confirmation")
    confirmation_element.querySelector(".float-confirmation-text").textContent = msg_text
    setTimeout(() => {
        floater.style.bottom = "4.5rem";
    }, 1)
    setTimeout(() => {
        floater.style.opacity = "0";
    }, fade_after)
    setTimeout(() => {
        //confirmation_element.querySelector(".float-add-confirmation").style.bottom = "5rem";
        document.body.removeChild(confirmation_element)
    }, fade_after + 5*1000)

}