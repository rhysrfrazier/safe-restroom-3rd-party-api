const submitBtn = document.querySelector("#submit")

function addCard(mapLink, placeVar, addressVar, srAccessVar, iconAccessVar, srUnisexVar, iconUnisexVar, srChangingVar, iconChangingVar) {
    //creating the card and attaching it to the list
    const resultCard = document.createElement("li")
    resultCard.classList.add("resultCard")
    document.querySelector("#resultList").appendChild(resultCard)
    //creating and attaching left side, with location name and address
    const left = document.createElement("div")
    left.setAttribute("id", "left")
    resultCard.appendChild(left)
    const placeName = document.createElement("h2")
    placeName.setAttribute("id", "placeName")
    left.appendChild(placeName)
    const link = document.createElement("a")
    link.setAttribute("id", "link")
    link.setAttribute("target", "_blank")
    link.href = mapLink 
    link.innerHTML = placeVar 
    placeName.appendChild(link)
    const address = document.createElement("p")
    address.setAttribute("id", "address")
    address.innerHTML = addressVar
    left.appendChild(address)
    //creating the right size with the three options
    const right = document.createElement("div")
    right.setAttribute("id", "right")
    resultCard.appendChild(right)
    //accessibility section
    const accessOp = document.createElement("div")
    accessOp.classList.add("options")
    right.appendChild(accessOp)
    const accessHeader = document.createElement("p")
    accessHeader.classList.add("opText")
    accessHeader.innerHTML = "Accessible: "
    accessOp.appendChild(accessHeader)
    const srAccessText = document.createElement("p")
    srAccessText.classList.add("invisible", "opText")
    srAccessText.innerHTML = srAccessVar
    accessOp.appendChild(srAccessText)
    const accessIcon = document.createElement("img")
    accessIcon.src = iconAccessVar 
    accessIcon.classList.add("icon")
    accessIcon.setAttribute("aria-hidden", "true")
    accessOp.appendChild(accessIcon)
    //unisex section
    const unisexOp = document.createElement("div")
    unisexOp.classList.add("options")
    right.appendChild(unisexOp)
    const unisexHeader = document.createElement("p")
    unisexHeader.classList.add("opText")
    unisexHeader.innerHTML = "Unisex: "
    unisexOp.appendChild(unisexHeader)
    const srUniText = document.createElement("p")
    srUniText.classList.add("invisible", "opText")
    srUniText.innerHTML = srUnisexVar 
    unisexOp.appendChild(srUniText)
    const unisexIcon = document.createElement("img")
    unisexIcon.src = iconUnisexVar
    unisexIcon.classList.add("icon")
    unisexIcon.setAttribute("aria-hidden", "true")
    unisexOp.appendChild(unisexIcon)
    //changing station section
    const changeOp = document.createElement("div")
    changeOp.classList.add("options")
    right.appendChild(changeOp)
    const changeHeader = document.createElement("p")
    changeHeader.classList.add("opText")
    changeHeader.innerHTML = "Changing Table: "
    changeOp.appendChild(changeHeader)
    const srChangeText = document.createElement("p")
    srChangeText.classList.add("invisible", "opText")
    srChangeText.innerHTML = srChangingVar
    changeOp.appendChild(srChangeText)
    const changeIcon = document.createElement("img")
    changeIcon.src = iconChangingVar
    changeIcon.classList.add("icon")
    changeIcon.setAttribute("aria-hidden", "true")
    changeOp.appendChild(changeIcon)
    //making the card itself clickable
    resultCard.addEventListener("click", () => link.click())
}

function removeCards() {
    const resultCards = document.querySelectorAll(".resultCard")
    resultCards.forEach((card) => card.remove())
}

function makeLoadText(){
    loading = document.createElement("h1")
    loading.setAttribute("id", "loading")
    loading.innerHTML = "Loading Results..."
    document.body.appendChild(loading)
}

function removeLoadText(){
    loading = document.getElementById("loading")
    loading.remove()
}

submitBtn.onclick = async () => {
    const cityInput = document.querySelector("#city").value
    const stateInput = document.querySelector("#state").value
    
    removeCards()
    makeLoadText()

    let geoResult = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${cityInput}&country=US&state=${stateInput}`,
        { headers: { "X-Api-Key": "EwA0oHXQy43xs6jnEsvICQ==5Bj70iJpnMZ8zfSt"}
        }
    )
    const lat = geoResult.data[0].latitude
    const long = geoResult.data[0].longitude

    const restroomResult = await axios.get(`https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat=${lat}&lng=${long}`)
    
    removeLoadText()

    for (let i=0 ; i<restroomResult.data.length ; i++){
        let placeVar =restroomResult.data[i].name
        let addressVar = restroomResult.data[i].street
        let accessible = restroomResult.data[i].accessible
        let unisex = restroomResult.data[i].unisex
        let changingStation = restroomResult.data[i].changing_table
        let mapLink = `https://google.com/maps/dir//${placeVar} ${addressVar}`
        let srAccessVar
        let iconAccessVar
        let srUnisexVar
        let iconUnisexVar
        let srChangingVar
        let iconChangingVar

        if(accessible){
            srAccessVar = "yes"
            iconAccessVar = "green_check.svg.png"
        } else {
            srAccessVar = "no"
            iconAccessVar = "red_x.svg.png"
        }
        if (unisex){
            srUnisexVar = "yes"
            iconUnisexVar = "green_check.svg.png"
        } else {
            srUnisexVar = "no"
            iconUnisexVar = "red_x.svg.png"
        }
        if (changingStation){
            srChangingVar = "yes"
            iconChangingVar = "green_check.svg.png"
        } else {
            srChangingVar = "no"
            iconChangingVar = "red_x.svg.png"
        }

        addCard(mapLink, placeVar, addressVar, srAccessVar, iconAccessVar, srUnisexVar, iconUnisexVar, srChangingVar, iconChangingVar)
    }
}
