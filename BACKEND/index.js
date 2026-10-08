/**
 *    ____                                   ____             _                  _   ____       _            _
 *  / ___|  ___ _ ____   _____ _   _ _ __  | __ )  __ _  ___| | _____ _ __   __| | |  _ \ ___ | | _____  __| | _____  __
 *  \___ \ / _ \ '__\ \ / / _ \ | | | '__| |  _ \ / _` |/ __| |/ / _ \ '_ \ / _` | | |_) / _ \| |/ / _ \/ _` |/ _ \ \/ /
 *   ___) |  __/ |   \ V /  __/ |_| | |    | |_) | (_| | (__|   <  __/ | | | (_| | |  __/ (_) |   <  __/ (_| |  __/>  <
 *  |____/ \___|_|    \_/ \___|\__,_|_|    |____/ \__,_|\___|_|\_\___|_| |_|\__,_| |_|   \___/|_|\_\___|\__,_|\___/_/\_\
 */

// V2
// Import de la fonction de limitation du nombre de requêtes par IP
const limitRequests = require('./limit_requests.js');

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
// Pour éviter d'avoir des erreurs CORS
const cors = require('cors');
app.use(cors());
// Utilisation du composant Router
const router = express.Router();

// Définir un préfixe à TOUTES les routes
app.use('/api/v1', router);


app.listen(
    PORT,           // Port d'écoute
    '0.0.0.0',    // Adresse IP (localhost) On met 0.0.0.0 pour que TOUTES les interfaces soient à l'écoute
    () => {
        console.log('Server Pokedex is listening on ' + PORT);  // Message dans la console
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
router.get('/pokemons', findAllPokemon);

// *********************************************
// Route random
// Path: /pokemons/random
// Method: GET
// *********************************************
router.get('/pokemons/random', findOneByRandom);

// *********************************************
// Route POKEMON BY ID
// Path: /pokemons/:id (id doit être un entier)
// Method: GET
// *********************************************
router.get('/pokemons/:id(\\d+)', findOneById);

// *********************************************
// Route POKEMON BY NAME
// Path: /pokemons/:name (name doit être une string)
// Method: GET
// *********************************************
router.get('/pokemons/:name', findOneByName);


// *********************************************



// *********************************************
// Création des fonctions qui sont appelées par les routes
// *********************************************

/**
 * Fonction qui est appelée par la route /
 * 
 * @param {*} request 
 * @param {*} response 
 */
function findAllPokemon(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

    // 0. Limitation du nombre de requêtes par IP
    if (!limitRequests(request, 1, 60000)) {
        console.log(`Too many requests from IP: ${request.ip}`);
        
        return response.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // 3. Renvoie tout le json interprété
    response.send(pokedex);
}

/**
 * Fonction qui est appelée par la route /pokemons/random en GET
 * 
 * @param {*} request 
 * @param {*} response 
 */
function findOneByRandom(request, response)
{
    // Appel de la fonction de debug des routes
    debugRoute(request);

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

/**
 * Fonction qui est appelée par la route /pokemons/:id en GET
 * 
 * @param {*} request 
 * @param {*} response 
 */
function findOneById(request, response)
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


/**
 * Fonction qui est appelée par la route /pokemons/:name en GET
 * 
 * @param {*} request 
 * @param {*} response 
 */
function findOneByName(request, response)
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


/**
 * Fonction qui est appelée par la route /type en GET
 * 
 * @param {*} request 
 * @param {*} response 
 */
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



/**
 * Fonction qui est appelée par la route /hp en GET
 * 
 * @param {*} request 
 * @param {*} response 
 */
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



/**
 * Fonction de debug des routes
 * @param {*} request 
 */
function debugRoute(request){
    console.log("---------------------------");
    console.log("Route appelée: " + request.url);
    console.info("Method: " + request.method);
    console.info("Params: " + request.body);
    console.log("---------------------------");
}