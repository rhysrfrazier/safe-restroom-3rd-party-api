const submitBtn = document.querySelector("#submit")

function addCard(placeVar, addressVar, accessVar, unisexVar, changingVar) {
    //creating the overall div and setting it's class for styling
    const resultCard = document.createElement("div")
    resultCard.classList.add("resultCard")
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
    access.innerHTML = accessVar//create strings for each option that will put the innerHTML you need in here, but make those later in the api call section... each variable in here needs to correspond to a perameter that I can pass the variables in to
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
    document.body.appendChild(resultCard)
}
// addCard("Place", "XXXX Place, Charlottesville, VA XXXXX", "not accessible", "yes unisex", "no changing station")
// addCard("Not-house", "6796 Sugar Hollow Rd, Crozet VA 22932", "not accessible", "yes unisex", "no changing station")

const resultCards = document.querySelectorAll(".resultCard")//this MUST go after the addCard function call to pick up the cards
function removeCards() {
    resultCards.forEach((card) => card.remove())
}
// removeCards()

submitBtn.onclick = async () => {
    removeCards()
    const cityInput = document.querySelector("#city").value
    const stateInput = document.querySelector("#state").value

    let geoResult = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${cityInput}&country=US&state=${stateInput}`,
        { headers: { "X-Api-Key": "EwA0oHXQy43xs6jnEsvICQ==5Bj70iJpnMZ8zfSt"}
        }
    )
    const lat = geoResult.data[0].latitude
    const long = geoResult.data[0].longitude

    const restroomResult = await axios.get(`https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat=${lat}&lng=${long}`)

    for (let i=0 ; i<restroomResult.data.length ; i++){
        let placeName =restroomResult.data[i].name //string
        let address = restroomResult.data[i].street //string
        let accessible = restroomResult.data[i].accessible //bool
        let unisex = restroomResult.data[i].unisex //bool
        let changingStation = restroomResult.data[i].changing_table//bool

    }

    console.log(restroomResult)
}
