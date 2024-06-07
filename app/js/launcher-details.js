document.addEventListener('DOMContentLoaded', function () {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const launcherID = parseInt(urlParams.get('id'))
    
    render({
        launcherData: getLauncherById(launcherID),
        navbar_style: 'nav-style-dark', navbar_active: 'details.html'
    }).then(() => {
        
        const goBackButton = $("#go-back-button")

        goBackButton.addEventListener("click", (event) => {
            history.back();
        })

    })

})
