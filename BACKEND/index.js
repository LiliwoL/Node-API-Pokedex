/**
 *    ____                                   ____             _                  _   ____       _            _
 *  / ___|  ___ _ ____   _____ _   _ _ __  | __ )  __ _  ___| | _____ _ __   __| | |  _ \ ___ | | _____  __| | _____  __
 *  \___ \ / _ \ '__\ \ / / _ \ | | | '__| |  _ \ / _` |/ __| |/ / _ \ '_ \ / _` | | |_) / _ \| |/ / _ \/ _` |/ _ \ \/ /
 *   ___) |  __/ |   \ V /  __/ |_| | |    | |_) | (_| | (__|   <  __/ | | | (_| | |  __/ (_) |   <  __/ (_| |  __/>  <
 *  |____/ \___|_|    \_/ \___|\__,_|_|    |____/ \__,_|\___|_|\_\___|_| |_|\__,_| |_|   \___/|_|\_\___|\__,_|\___/_/\_\
 */

//console.log ("Hello World!");

// ************************************************
// CONFIGURATION
// ************************************************
// Emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";
// Emplacement des images
const IMAGES_SRC = "./FILES/images";
// Port utilisé par notre API
const PORT = 5001;
// ************************************************

// ************************************************
// Dépendances et chargement de modules
// ************************************************
const fs = require('fs');

// 🫷 Bien avoir installé express via npm!
// npm install express
const express = require('express');
// ************************************************

// ************************************************
// Création du serveur
// ************************************************
const app = express();

app.listen(
    PORT,           // Port d'écoute
    '127.0.0.1',    // Adresse IP (localhost)
    () => {
        console.log('Server Pokedex is listening on ' + PORT);  // Message dans la console
    }
)


// *********************************************
// Création des routes
// *********************************************

// ***************************************
// Route principale qui sert l'url /
// Elle renverra la liste de TOUS les pokemon
// ***************************************
app.get(
    '/',
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
// Route qui sert l'url /random
// Elle renverra UN pokemon au hasard
// *********************************************
app.get('/random', findByIdRandomly);

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