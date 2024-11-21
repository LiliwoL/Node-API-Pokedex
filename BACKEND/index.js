/*

  ____       _            _             ____             _                  _
 |  _ \ ___ | | _____  __| | _____  __ | __ )  __ _  ___| | _____ _ __   __| |
 | |_) / _ \| |/ / _ \/ _` |/ _ \ \/ / |  _ \ / _` |/ __| |/ / _ \ '_ \ / _` |
 |  __/ (_) |   <  __/ (_| |  __/>  <  | |_) | (_| | (__|   <  __/ | | | (_| |
 |_|   \___/|_|\_\___|\__,_|\___/_/\_\ |____/ \__,_|\___|_|\_\___|_| |_|\__,_|

 */

// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";

// Définir un port pour le serveur
const PORT = 5001;
// Définir une écoute sur toutes les interfaces
const URL = '0.0.0.0';


// ************************************************
// Configuration et Lancement du serveur
// ************************************************

// Importer le module fs pour liore les fichiers
const fs = require('fs');
// Importer le module express pour créer un serveur
const express = require('express');
// Importer le module cors pour autoriser les requêtes cross-origin
const cors = require('cors')

// Créer une application express
const app = express();

// Utiliser le middleware CORS sur l'application (sera utile pour les requêtes cross-origin)
app.use(cors())
// Express va servir les fichiers statiques placés dans le dossier FILES
app.use(express.static('FILES'))

// Lancement du serveur et attendre les connexions
app.listen(
    PORT,
    // Ecoute sur toutes les interfaces
    URL,
    () => {
        // Effacer la console
        console.log('\033[2J');
        // Afficher un message de lancement du serveur
        console.log('Server Pokedex is listening on ' + PORT);
    }
)


// *********************************************
// Définition des routes
// *********************************************


// *********************************************
// Route POKEMON ALL
// Path: /
// Method: GET
// *********************************************
app.get(
    '/',
    findAllPokemon
);

// *********************************************
// Route POKEMON RANDOM
// Path: /hasard
// Method: GET
// *********************************************
app.get('/hasard', findByIdRandomly);

// *********************************************
// Route POKEMON BY ID
// Path: /pokemon/:id (id doit être un entier)
// Method: GET
// *********************************************
app.get('/pokemon/:id(\\d+)', findById);

// *********************************************
// Route POKEMON BY NAME
// Le nom doit être le nom Français du Pokemon
// Path: /pokemon/name/:name (name doit être une string)
// Method: GET
// *********************************************
app.get('/pokemon/name/:name', findByName);

// *********************************************
// Route POKEMON BY TYPE
// Path: /pokemon/type/:type (type doit être une string)
// Method: GET
// *********************************************
app.get('/pokemon/type/:type', findByType);

// *********************************************
// Route POKEMON BY HP
// Path: /pokemon/hp/:hp (type doit être un entier)
// Method: GET
// *********************************************
app.get('/pokemon/hp/:hp', findByHP);





// *********************************************
// Définition des fonctions de gestion des routes
// *********************************************

// *********************************************
// Fonction qui est appelée par la route / en GET
// *********************************************
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
// Fonction qui est appelée par la route /hasard en GET
// *********************************************
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
// Fonction qui est appelée par la route /pokemon/:id en GET
// *********************************************
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
        reply = false;
    }

    // Envoi des données
    if (reply) {
        response.send(reply);
    } else {
        response.status(404).send('Erreur, pokemon pas trouvé!');
    }
}

// *********************************************
// Fonction qui est appelée par la route /pokemon/name en GET
// *********************************************
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

    // Envoi des données
    if (reply.length > 0) {
        response.send(reply);
    } else {
        response.status(404).send('Erreur, pokemon pas trouvé!');
    }
}

// *********************************************
// Fonction qui est appelée par la route /type en GET
// *********************************************
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

    // Envoi des données
    if (reply.length > 0) {
        response.send(reply);
    } else {
        response.status(404).send('Erreur, pokemon pas trouvé!');
    }
}

// *********************************************
// Fonction qui est appelée par la route /type en GET
// *********************************************
function findByHP(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // Récupération du paramètre
    let hp = request.params.hp;

    console.log(`Recherche du nombre de HP: ${hp}`);

    const reply = pokedex.filter(
        (pokemon) =>
            pokemon.base.HP === hp
    );

    // Envoi des données
    if (reply.length > 0) {
        response.send(reply);
    } else {
        response.status(404).send('Erreur, pokemon pas trouvé!');
    }
}



// *********************************************
// Fonction de debug des routes
// *********************************************
function debugRoute(request){
    console.log("---------------------------");
    console.log("Route appelée: " + request.url);
    console.info("Method: " + request.method);
    console.info("Params: " + request.body);
    console.log("---------------------------");
}