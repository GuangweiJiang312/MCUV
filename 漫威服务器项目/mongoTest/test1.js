let characters = require('../assets/ComicEvents')

console.log(characters.features);
let array = []

for(let data in characters.features){
    // console.log(characters.characters[data].id);
    array.push({value:characters.features[data].properties.name,coordinates:characters.features[data].geometry.coordinates})
}

obj = {incident:array}

let fs = require("fs");

fs.writeFile( "incidentName.json", JSON.stringify( obj ), "utf8",() => {
    console.log(1);
} );