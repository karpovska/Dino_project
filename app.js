let dinoArray = [];

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

// Read data from JSON
fetch("https://raw.githubusercontent.com/karpovska/Udacity_Object-Oriented-Javascript/master/dino.json")
    .then(response => response.json())
    .then(result => {
        dinoArray = createDinoArray(result.Dinos);
    });

// Create Dino array
function createDinoArray(dinos) {
    dinos.forEach(element => {
        dinoArray.push(
            new Dino(
                element.species,
                element.weight,
                element.height,
                element.diet,
                element.where,
                element.when,
                element.fact,
            )
        );
    });
    return dinoArray;
}

// Create Human Object
let human = {
    humanName: '',
    heightFeet: 0,
    heightInches: 0,
    weight: 0,
    diet: ''
}

// Use IIFE to get human data from form
human = (function () {
    return {
        getHumanData: function () {
            human.humanName = document.getElementById("name").value;
            human.heightFeet = document.getElementById("feet").value;
            human.heightInches = document.getElementById("inches").value;
            human.weight = document.getElementById("weight").value;
            human.diet = document.getElementById("diet").value;
            return human;
        },
    };
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(human, dino) {
    if (human.diet === dino.diet) {
        dino.fact = 'You and ' + dino.species + ' have the same diet';
    } else {
        dino.fact = 'You and ' + dino.species + ' have different diet';
    }
    return dino.fact;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(human, dino) {
    if (human.weight === dino.weight) {
        dino.fact = 'You and ' + dino.species + ' have the same weight';
    } else if (human.weight < dino.weight) {
        dino.fact = dino.species + ' is ' + (dino.weight - human.weight) + ' lbs heavier then you';
    } else {
        dino.fact = dino.species + ' is ' + (human.weight - dino.weight) + ' lbs lighter then you';
    }
    return dino.fact;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight(human, dino) {
    // Calculate human height in inches
    let humanHeightInInches = human.heightFeet * 12 + human.heightInches;
    if (humanHeightInInches === dino.height) {
        dino.fact = 'You and ' + dino.species + ' have the same height';
    } else if (humanHeightInInches < dino.height) {
        dino.fact = dino.species + ' is ' + (dino.height - humanHeightInInches) + ' inches taller then you';
    } else {
        dino.fact = dino.species + ' is ' + (humanHeightInInches - dino.height) + ' inches smaller then you';
    }
    return dino.fact;
}

// Generate Tile Data for each Dino in Array
function createTilesData() {
    // Go through the array and generate random fact if needed
    dinoArray.forEach((element, idx) => {
        if(element.species !== 'Pigeon' && idx < 3){
            selectRandomFact(human, element);
        }
    });
    shuffleArray(dinoArray);

    // Add human to the dino array
    dinoArray.splice(4, 0, human);
}

// Shuffle compare methods to choose one randomly
function selectRandomFact(human, dino) {
    let compareFunctionArray = [compareDiet, compareHeight, compareWeight];
    shuffleArray(compareFunctionArray);
    dino.fact = compareFunctionArray[0](human, dino);
}

// Randomize array using Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function () {
    // Read human data from the form
    human.getHumanData();

    // Remove form from screen
    document.getElementById("dino-compare").style.display = "none";
    // Generate data for tiles such as fact for dinos and adding human data to dino array
    createTilesData();

    // Add tiles to DOM
    dinoArray.forEach(element => {
        // Create html-container for an image
        let img = document.createElement("img");
        img.className = "grid-item";

        let animalName = '';
        let animalFact = '';

        // Create html-container for a tile
        let tileContainer = document.createElement("div");
            tileContainer.className = "grid-item";
            tileContainer.id = "tile-container";
            document.getElementById("grid").appendChild(tileContainer);

        // If animal is a dinosaur - define img, fact and species
        if(Object.prototype.hasOwnProperty.call(element, "fact")){
            img.src = `./images/${element.species.toLowerCase()}.png`;
            animalName = element.species;
            animalFact = element.fact;

        // If animal is a human - define name and image
        }else{
            img.src = "./images/human.png";
            animalName = human.humanName;
        }

        // Create html-container for animale name
        let nameTag = document.createElement("h3");
            nameTag.className = "grid-item";
        let nameText = document.createTextNode(animalName);
            nameTag.appendChild(nameText);

        // Create html-container for animal fact
        let factTag = document.createElement("p");
            factTag.className = "grid-item";
        let factText = document.createTextNode(animalFact);
            factTag.appendChild(factText);

        // Add all html-elements to tile container
        tileContainer.appendChild(nameTag);
        tileContainer.appendChild(img);
        tileContainer.appendChild(factTag);
    })
});