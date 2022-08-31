require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let destination = document.getElementById("missionTarget");

    destination.innerHTML = `
    <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `
}

// Validation for correct input.
function validateInput(testInput) {
    if(testInput === "" || testInput === 0) {
        return "Empty";
    } else if(isNaN(testInput)) {
        return "Not a number";
    } else {
        return "Is a number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    

    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
    validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
    } else if(validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number") {
        alert("Pilot and Copilot fields cannot be a number.");
    } else if(validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a number" ) {
        alert("Fuel and cargo mass fields have to be a number.")
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `Copilot ${copilot} is ready`;
        list.style.visibility = "invisible";
    }

    if(fuelLevel < 10000 && cargoLevel > 10000) {
        fuelStatus.innerHTML = "There is not enough fuel for launch.";
        cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        list.style.visibility = "visible";
    } else if(fuelLevel < 10000) {
        fuelStatus.innerHTML = "There is not enough fuel for launch.";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        list.style.visibility = "visible";
    } else if(cargoLevel > 10000) {
        cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        list.style.visibility = "visible";
    } else {
        launchStatus.innerHTML = "Shuttle is ready for launch.";
        launchStatus.style.color = "green";
    }


}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        if(response.status >= 400) {
            throw new Error("Bad response")
        } else {
            return response.json();
        }
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let rdm = Math.floor(Math.random() * planets.length);
    return planets[rdm];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
