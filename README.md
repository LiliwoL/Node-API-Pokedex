# Pokemon API

Serveur Backend en Node JS

## Arborescence

Tous les fichiers du serveur backend sont dans le dossier **BACKEND**.


## Objectifs

- Découverte de Node JS
- Comprendre le principe des API

# Mise en place

- Création d'un dépôt git local sur WSL
```bash
git init .
```

- Installation de Node, npm et des dépendances

```bash
sudo apt install nodejs npm
# Dépendances
npm install express
```

- Installation de **nodemon** pour avoir un node qui se relance à chaque modification du fichier
```bash
npm install -g nodemon
```

# Création du script du serveur

On crée un fichier serveur nommé *index.js*.

Contenu de base:
```js
/**
 *  Serveur Backend Pokedex
 */

//console.log ("Hello World!");

// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";

// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";


// Définir un port
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
        console.log('Server Pokedex is listening on ' + PORT);
    }
)
```


Pour le lancer, tapez:

```bash
node index.js

# Pour lancer plutôt en monitoring
nodemon index.js
```

# Routes à créer

## / (Pour tout afficher)

## /hasard (pour renvoyer un pokemon au hasard)

Algorithme:

1. Création de la route /hasard
2. Définition d'un numéro au hasard compris entre le minimum et le maximum
    1. Quel est l'id minimum?
    2. Quel est l'id maximum?
        1. Quelle est la taille du pokedex?
3. Renvoi du pokemeon ayant l'id **hasard**

- https://www.w3schools.com/js/js_random.asp

## /pokemon/ + un identifiant en paramètre (pour renvoyer un pokemon à partir d'un identifiant, si le pokemon correspondant existe)

## /pokemon/ + un nom (pour renvoyer un pokemon à partir d'un nom, si le pokemon correspondant existe)




# Ce qu'il faudra faire ultérieurement

- Création du dépôt distant GitHub

- Clonage du dépôt distant sur la VM


# Source


# Dépendances


---

# Frontend

Vous trouverez un début de frontend dans le dossier **FRONT**





# Lancement

npm run start



___
## Copyright Notice

Please note everything in repository are copyrighted by the Pokémon Company and its affiliates.
This repository is merely a compilation of data collected by the editors of [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page).
