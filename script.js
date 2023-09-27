const submitBtn = document.querySelector("#submit")

function addCard(mapLink, placeVar, addressVar, accessVar, unisexVar, changingVar) {
    //creating the overall div and setting it's class for styling - UPDATE: need to go back and make these list items instead for accessibility reasons, i think...
    const resultLink = document.createElement("a")
    resultLink.classList.add("resultLink")
    resultLink.href = mapLink //maplink is a string contingent on api results
    resultLink.setAttribute("target", "_blank")
    resultLink.setAttribute("aria-label", "link to google maps")
    resultLink.setAttribute("role", "link")

    const resultCard = document.createElement("div")
    resultCard.classList.add("resultCard")
    resultCard.setAttribute("aria-label", "result card")
    resultLink.appendChild(resultCard)
    //creating the "left" div and setting it's id for styling
    const left = document.createElement("div")
    left.setAttribute("id", "left")
    //attaching "left" to the resultCard
    resultCard.appendChild(left)
    //adding the placeName section and attaching it to left
    const h2 = document.createElement("h2")
    h2.setAttribute("id", "placeName")
    h2.innerHTML = placeVar
    left.appendChild(h2)
    //adding the address section and attaching it to left
    const h3 = document.createElement("h3")
    h3.setAttribute("id", "address")
    h3.innerHTML = addressVar
    left.appendChild(h3)
    //creating the "right" div and attaching it to the resultCard
    const right = document.createElement("div")
    right.setAttribute("id", "right")
    resultCard.appendChild(right)
    //adding the options
    const access = document.createElement("h4")
    access.classList.add("options")
    access.setAttribute("id", "accessible")
    access.innerHTML = accessVar
    right.appendChild(access)
    const unisex = document.createElement("h4")
    unisex.classList.add("options")
    unisex.setAttribute("id", "unisex")
    unisex.innerHTML = unisexVar
    right.appendChild(unisex)
    const changingStation = document.createElement("h4")
    changingStation.classList.add("options")
    changingStation.setAttribute("id", "changingStation")
    changingStation.innerHTML = changingVar
    right.appendChild(changingStation)
    //add the whole card to the body
    document.body.appendChild(resultLink)
}

//addCard("https://google.com/maps/dir//noodles and company 200 A shorebirt street", "Noodles and Company", "200 A Shorebird St", 'Accessible: <img class="icon" src="green_check.svg.png" alt="yes" />', 'Unisex: <img class="icon" src="green_check.svg.png" alt="yes" />', 'Changing Station: <img class="icon" src="red_x.svg.png" alt="no" />')

function removeCards() {
    const resultLinks = document.querySelectorAll(".resultLink")
    resultLinks.forEach((link) => link.remove())
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
