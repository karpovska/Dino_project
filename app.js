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
    this.randomFact;
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
function compareDiet (human, dino) {
    if(human.diet===dino.diet){
        dino.randomFact = 'You and ' + dino.species + ' have the same diet';
    }else{
        dino.randomFact = 'You and ' + dino.species + ' have different diet';
    }
    return dino.randomFact;    
}

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight (human, dino) {
    if(human.weight === dino.weight){
        dino.randomFact = 'You and ' + dino.species + ' have the same weight';
    }else if(human.weight < dino.weight){
        dino.randomFact = dino.species + ' is ' + (dino.weight - human.weight) + ' lbs heavier then you';
    }else{
        dino.randomFact = dino.species + ' is ' + (human.weight - dino.weight) + ' lbs lighter then you';
    }
    return dino.randomFact;
}
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight (human, dino) {
    let humanHeightInInches = 0;
    function toInches(human){
        humanHeightInInches = human.heightFeet*12 + human.heightInches;
        return humanHeightInInches;
    }
    if(humanHeightInInches === dino.height){
        dino.randomFact = 'You and ' + dino.species + ' have the same height';
    }else if(humanHeightInInches < dino.height){
        dino.randomFact = dino.species + ' is ' + (dino.height - humanHeightInInches) + ' inches taller then you';
    }else{
        dino.randomFact = dino.species + ' is ' + (humanHeightInInches - dino.height) + ' inches smaller then you';
    }
    return dino.randomFact;

}


    // Generate Tiles for each Dino in Array
function createTile(dino) {
    
}
        // Add tiles to DOM

    // Remove form from screen

    


// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function() {
    human.getHumanData();
    console.log(human);

    document.getElementById('dino-compare').style.display = "none";
    

/*1) First, create a div section and add some text to it using <p> tags. 

2) Create an element <p> using document.createElement("p").

3) Create a text, using document.createTextNode(), so as to insert it in the above-created element("p").

4) Using appendChild() try to append the created element, along with text, to the existing div tag.

Thus a new element is created(<p>) and appended to the existing element(<div>). */

    let tag = document.createElement("p");
    let text = document.createTextNode("This is the place for my grid");
    tag.appendChild(text);
    document.getElementById("grid").appendChild(tag);



    //console.log(dinoArray);
  });