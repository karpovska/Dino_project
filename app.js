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
            element.fact
        )
        dinoArray.push(newObj);
    });
    return dinoArray;
}

console.log(dinoArray);
    
// Create Human Object
let human = {
    humanName: '',
    height: 0,
    weight: 0,
    diet: ''
}


// Use IIFE to get human data from form
human = (function () {
    return {
         getHumanData: function () {
            human.humanName = document.getElementById('name').value;
            human.height = document.getElementById('feet').value;
            human.weight = document.getElementById('weight').value;
            human.diet = document.getElementById('diet').value;
            return human;
         },         
    };
})();



    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function() {
    human.getHumanData();
    console.log(human);
  });