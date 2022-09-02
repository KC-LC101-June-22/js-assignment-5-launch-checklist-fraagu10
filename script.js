// Write your JavaScript code here!

window.addEventListener("load", function() {
    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        
    }).then(function () {
        let randomPlanet = pickPlanet(listedPlanets);
        let name = randomPlanet.name;
        let diameter = randomPlanet.diameter;
        let star = randomPlanet.star;
        let distance = randomPlanet.distance;
        let moons = randomPlanet.moons;
        let imageUrl = randomPlanet.image;

        addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl)
        
    })
});


window.addEventListener("load", function() {
    let document = window.document;
    let list = document.getElementById("faultyItems");
    let pilot = document.getElementById("pilotName").value;
    let copilot = document.querySelector("input[name=copilotName]").value;
    let fuel = document.querySelector("input[name=fuelLevel]").value;
    let cargo = document.querySelector("input[name=cargoMass]").value;
    
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        
        event.preventDefault();
        formSubmission(document, list, pilot, copilot, fuel, cargo);
    })

});