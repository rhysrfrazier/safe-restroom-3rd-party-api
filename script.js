const submitBtn = document.querySelector("#submit")

function addCard(mapLink, placeVar, addressVar, srAccessVar, iconAccessVar, srUnisexVar, iconUnisexVar, srChangingVar, iconChangingVar) {
    //creating the card and attaching it to the list
    const resultCard = document.createElement("li")
    resultCard.setAttribute("id", "resultCard")
    document.querySelector("#resultList").appendChild(resultCard)
    //creating and attaching left side, with location name and address
    const left = document.createElement("div")
    left.setAttribute("id", "left")
    resultCard.appendChild(left)
    const placeName = document.createElement("h2")
    placeName.setAttribute("id", "placeName")
    left.appendChild(placeName)
    const link = document.createAttribute("a")
    link.setAttribute("id", "link")
    link.setAttribute("target", "_blank")
    link.href = mapLink // a string url based on the place name and address generated by the api
    link.innerHTML = placeVar //^^
    placeName.innerHTML = link
    const address = document.createElement("p")
    address.setAttribute("id", "address")
    address.innerHTML = addressVar //^^
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
    srAccessText.innerHTML = srAccessVar //a yes/no string based on a conditional
    accessOp.appendChild(srAccessText)
    const accessIcon = document.createElement("img")
    accessIcon.src = iconAccessVar //a url for either the check or x
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
    srUniText.innerHTML = srUnisexVar //a y/n string based on a conditional
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
}

addCard("https://google.com", "Hell", "200 Hell st", "no", "red_x.svg.png", "no", "red_x.svg.png", "no", "red_x.svg.png")

// function removeCards() {
//     const resultLinks = document.querySelectorAll(".resultLink")
//     resultLinks.forEach((link) => link.remove())
// }

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
        let placeVar =restroomResult.data[i].name //string
        let addressVar = restroomResult.data[i].street //string
        let accessible = restroomResult.data[i].accessible //bool
        let unisex = restroomResult.data[i].unisex //bool
        let changingStation = restroomResult.data[i].changing_table//bool
        let mapLink = `https://google.com/maps/dir//${placeVar} ${addressVar}`
        let accessVar
        let unisexVar
        let changingVar
        //there has to be a better way to do this next part but for now this will get the job done
        if(accessible){
            accessVar = 'Accessible: <img class="icon" src="green_check.svg.png" alt="yes" />'
        } else {
            accessVar = 'Accessible: <img class="icon" src="red_x.svg.png" alt="no" />'
        }
        if (unisex){
            unisexVar = 'Unisex: <img class="icon" src="green_check.svg.png" alt="yes" />'
        } else {
            unisexVar = 'Unisex: <img class="icon" src="red_x.svg.png" alt="no" />'
        }
        if (changingStation){
            changingVar = 'Changing Station: <img class="icon" src="green_check.svg.png" alt="yes" />'
        } else {
            changingVar = 'Changing Station: <img class="icon" src="red_x.svg.png" alt="no" />'
        }

        addCard(mapLink, placeVar, addressVar, accessVar, unisexVar, changingVar)
    }
}
