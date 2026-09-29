/**
 *  Serveur Backend Pokedex
 */

// *******************************
    // Liste des dépendances:
    // express, cors, nodemon
// *******************************




// *******************************
// *** CONSTANTES, et définition des variables
// *******************************

// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";

// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";

// Définir un port
const PORT = 5001;
// *******************************


// *******************************
// Dépendances et charment de modules
// *******************************
const fs = require('fs');



// ************************************************
// Lancer un serveur express sur un port défini
// ************************************************
const express = require('express');
const app = express();

// Pour éviter d'avoir des erreurs CORS
const cors= require('cors');
app.use(cors());
// Utilisation du composant Router
const router = express.Router();

// Pour que le serveur "serve" des fichiers statiques comme des images
// Ici dans le dossier FILES, là où sont placées toutes les images
app.use(express.static('FILES'));

// Définir un préfixe à TOUTES les routes
app.use('/api/v1', router);

// Lancement du serveur et attendre
app.listen(
    PORT,
    '0.0.0.0',
    () => {
        console.log('Server Pokedex is listening on ' + PORT);
    }
)


// *********************************************
// Création des routes
// *********************************************


// *********************************************
// Route par défaut
// Path: /pokemons
// Method: GET
// *********************************************
router.get(
    '/pokemons',
    findAllPokemon
)

// Fonction qui est appelée par la route /
function findAllPokemon(request, response)
{
    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // 3. Renvoie tout le json interprété
    response.send(pokedex);
}


// *********************************************
// Route random
// Path: /pokemons/random
// Method: GET
// *********************************************
router.get('/pokemons/random', findByIdRandomly);

function findByIdRandomly(request, response)
{
    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // 3. Au hasard
    let nb_pokemon = pokedex.length;
    console.log("Nb de pokemon " + nb_pokemon);

    let random = Math.floor(Math.random() * nb_pokemon) + 1;

    // 4. Sélection du pokemon au hasard
    reply = pokedex[random];

    response.send(reply);
}


// *********************************************
// Route POKEMON BY ID
// Path: /pokemons/:id (id doit être un entier)
// Method: GET
// *********************************************
router.get('/pokemons/:id(\\d+)', findById);

function findById(request, response)
{
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
// Path: /pokemons/:name (name doit être une string)
// Method: GET
// *********************************************
router.get('/pokemons/:name', findByName);

function findByName(request, response)
{
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
