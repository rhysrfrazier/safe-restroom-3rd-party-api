// function addCard(){
//     const footer = document.querySelector("#more")
//     const resultCard = document.createElement("div") //can i add .className and just do that at the same time here?
//     const left = document.createElement("div")
//     const h2 = document.createElement("h2")
//     const generatedName = document.createTextNode("Place Name Variable")
//     const addPlace = h2.appendChild(generatedName)
//     const placeName = left.appendChild(addPlace)
//     resultCard.appendChild(placeName) 
//     //const right = document.createElement("div")
// }
// addCard()

function addCard(){
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
    h2.innerHTML= "Place name var"
    left.appendChild(h2)
    //adding the address section and attaching it to left
    const h3 = document.createElement("h3")
    h3.setAttribute("id", "address")
    h3.innerHTML="Address var"
    left.appendChild(h3)
    //creating the "right" div and attaching it to the resultCard
    const right = document.createElement("div")
    right.setAttribute("id", "right")
    resultCard.appendChild(right)
    //adding the options
    const access = document.createElement("h4")
    access.classList.add("options")
    access.setAttribute("id", "accessible")
    access.innerHTML = "Accessible y/n var"//create strings for each option that will put the innerHTML you need in here, but make those later in the api call section
    right.appendChild(access)
    const unisex = document.createElement("h4")
    unisex.classList.add("options")
    unisex.setAttribute("id", "unisex")
    unisex.innerHTML = "Unisex y/n var"
    right.appendChild(unisex)
    const changingStation = document.createElement("h4")
    changingStation.classList.add("options")
    changingStation.setAttribute("id", "changingStation")
    changingStation.innerHTML = "Changing Station y/n var"
    right.appendChild(changingStation)
    //add the whole card to the body
    document.body.appendChild(resultCard)
}
addCard()