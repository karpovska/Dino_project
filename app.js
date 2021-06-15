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
fetch('dino.json')
    .then(response => response.json())
    .then(result => {
        dinoArray = createDinoArray(result.Dinos);
    });

// Create Dino array
function createDinoArray(dinos) {
    dinos.forEach(element => {
        newObj = new Dino(
            element.species,
            element.weight,
            element.height,
            element.diet,
            element.where,
            element.when,
            element.fact,
        )
        dinoArray.push(newObj);
    });
    return dinoArray;
}

console.log(dinoArray);

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
            human.humanName = document.getElementById('name').value;
            human.heightFeet = document.getElementById('feet').value;
            human.heightInches = document.getElementById('inches').value;
            human.weight = document.getElementById('weight').value;
            human.diet = document.getElementById('diet').value;
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
    let humanHeightInInches = 0;
    function toInches(human) {
        humanHeightInInches = human.heightFeet * 12 + human.heightInches;
        return humanHeightInInches;
    }
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

// Randomize array in-place using Durstenfeld shuffle algorithm 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
// Add tiles to DOM

// Remove form from screen




// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function () {
    human.getHumanData();
    console.log(human);

    document.getElementById('dino-compare').style.display = "none";
    //createTile(human);
    console.log(this.species);


    /*1) First, create a div section and add some text to it using <p> tags. 
    
    2) Create an element <p> using document.createElement("p").
    
    3) Create a text, using document.createTextNode(), so as to insert it in the above-created element("p").
    
    4) Using appendChild() try to append the created element, along with text, to the existing div tag.
    
    Thus a new element is created(<p>) and appended to the existing element(<div>). */

    let tag = document.createElement("p");
    let text = document.createTextNode("This is the place for my grid");
    tag.appendChild(text);
    document.getElementById("grid").appendChild(tag);

    const species = 'Pigeon';
    let img = document.createElement('img');
    img.src = `./images/${species.toLowerCase()}.png`;
    img.height = 60;
    img.width = 60;
    document.getElementById('grid').appendChild(img);
    //down.innerHTML = "Image Element Added."; 
    createTilesData();
    
    console.log(dinoArray);
});