generationTabButton = document.getElementById("generation-tab-button")
interpolationTabButton = document.getElementById("interpolation-tab-button")

generationTabActive = true

generationTab = document.getElementById("generation-tab")
interpolationTab = document.getElementById("interpolation-tab")

generationTabButton.onclick = function(){
    if (!generationTabActive) {
        generationTabActive = true
        generationTabButton.classList.add("active")
        interpolationTabButton.classList.remove("active")
        generationTab.classList.replace("d-none","d-block")
        interpolationTab.classList.replace("d-block","d-none")
    }    
}

interpolationTabButton.onclick = function(){
    if (generationTabActive) {
        generationTabActive = false
        interpolationTabButton.classList.add("active")
        generationTabButton.classList.remove("active")
        generationTab.classList.replace("d-block","d-none")
        interpolationTab.classList.replace("d-none","d-block")
    }
}