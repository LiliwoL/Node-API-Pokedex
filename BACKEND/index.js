/**
 *  Serveur Backend Pokedex
 */

// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";
// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";

// Définir un port pour le serveur
const PORT = 5001;

// ************************************************

// Lancer un serveur express sur un port défini

const fs = require('fs');

// npm install express
const express = require('express');
const app = express();

// Lancement du serveur et attendre
app.listen(
    PORT, 
    '127.0.0.1', 
    () => {
        // Effacer la console
        console.log('\033[2J');
        // Afficher un message de lancement du serveur
        console.log('Server Pokedex is listening on ' + PORT);
    }
)


// *********************************************
// Route POKEMON ALL
// Path: /
// Method: GET
// *********************************************
app.get(
    '/',
    findAllPokemon
)

// Fonction qui est appelée par la route / en GET
function findAllPokemon(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // 3. Renvoie tout le json interprété
    response.send(pokedex);
}




// *********************************************
// Route POKEMON RANDOM
// Path: /hasard
// Method: GET
// *********************************************
app.get('/hasard', findByIdRandomly);

function findByIdRandomly(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // 3. Au hasard
    let nb_pokemon = pokedex.length;
    console.log("Nb total de pokemon " + nb_pokemon);
    
    let random = Math.floor(Math.random() * nb_pokemon) + 1;
    console.log("Pokemon au hasard " + random);

    // 4. Sélection du pokemon au hasard
    reply = pokedex[random];

    response.send(reply);
}



// *********************************************
// Route POKEMON BY ID
// Path: /pokemon/:id (id doit être un entier)
// Method: GET
// *********************************************
app.get('/pokemon/:id(\\d+)', findById);

function findById(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

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



// *********************************************
// Route POKEMON BY NAME
// Le nom doit être le nom Français du Pokemon
// Path: /pokemon/name/:name (name doit être une string)
// Method: GET
// *********************************************
app.get('/pokemon/name/:name', findByName);

function findByName(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // Récupération du paramètre
    let name = request.params.name;

    // Formatage du nom en majuscules
    name = name.toUpperCase();

    const reply = pokedex.filter(
        (pokemon) => pokemon.name.french.toUpperCase() === name
    );

    response.send(reply);
}

// *********************************************
// Route POKEMON BY TYPE
// Path: /pokemon/type/:type (type doit être une string)
// Method: GET
// *********************************************
app.get('/pokemon/type/:type', findByType);

function findByType(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // Récupération du paramètre
    let type = request.params.type;

    console.log(`Recherche du type: ${type}`)

    // Formatage du type en majuscules
    type = type.toUpperCase();

    const reply = pokedex.filter(
        (pokemon) =>
            pokemon.type.some(
                (t) => t.toUpperCase() === type
            )
    );

    response.send(reply);
}

function debugRoute(request){
    console.log("---------------------------");
    console.log("Route appelée: " + request.url);
    console.info("Method: " + request.method);
    console.info("Params: " + request.body);
    console.log("---------------------------");
}