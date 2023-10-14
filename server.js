let fs = require('fs');


/* Localisation des fichiers de la base */
const pokedex_src = "./DATA/pokedex.json";
const pokedex_moves_src = "./DATA/moves.json";
const pokedex_items_src = "./DATA/items.json";
const pokedex_types_src = "./DATA/types.json";

/* Configuration de l'application */
const PORT = 5001;


// Lecture du JSON
let data = fs.readFileSync(pokedex_src);

// Lecture et interprétation
let pokedex = JSON.parse(data);

const express = require("express");
const app = express();

// To solve the cors issue
const cors=require('cors');

app.listen( PORT,
    () => console.log(`Server Start http://127.0.0.1:${PORT}`));

app.use(express.static('public'));
app.use(cors());




/* ******************************** */

// All data
// when get request is made, alldata() is called
app.get('/all', alldata);

function alldata(request, response) {

    // Returns all information about the elements
    response.send(pokedex);
}



// Find One By Id
app.get('/pokemon/:id(\\d+)', findById);

function findById(request, response)
{
    // Récupération du paramètre
    let id = request.params.id;

    let reply;

    // Recherche de l'id
    if(pokedex[id -1]) {
        reply = pokedex[id -1];
    }
    else {
        reply = {
            status:"Not Found"
        }
    }

    response.send(reply);
}

// Find By Name
app.get('/pokemon/:name/', findByName);

function findByName(request, response)
{
    // Récupération du paramètre
    let name = request.params.name;

    // Formatage du nom en majuscules
    name = name.toUpperCase();

    const reply = pokedex.filter(
        (pokemon) => pokemon.name.french.toUpperCase() === name
    );

    response.send(reply);
}
