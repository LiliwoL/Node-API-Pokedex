/**
 * Fonction qui va limiter le nombre de requêtes par IP sur une période donnée
 * 
 * @param {*} req 
 * @param {*} maxRequests 
 * @param {*} timeWindow 
 * @returns boolean
 */
function limitRequests(req, maxRequests = 10, timeWindow = 60000) {
  // Récupération de l'adresse IP contenue dans la requête
  const ip = req.ip;

  // Définition d'un booléen d'autorisation de la requête
  let requestAuthorized = true;

  // Récupération du moment actuel
  const currentTime = Date.now();
  
  // Dans l'objet **Application** de l'objet **request** on ajoute un tableau de **comptage des requêtes**
  if (!req.app.locals.requestCounts) {
    req.app.locals.requestCounts = {};
  }

  //console.log(req.app.locals.requestCounts);

  // On y ajoute l'adresse IP de la requête (un **timestamp** est automatiquement ajouté)
  if (!req.app.locals.requestCounts[ip]) {
    req.app.locals.requestCounts[ip] = [];
  }

  // Si l'adresse IP est déjà présente dans ce tableau ET que son **timestamp** est trop ancien, on le supprime
  req.app.locals.requestCounts[ip] = req.app.locals.requestCounts[ip].filter(
    (timestamp) => currentTime - timestamp < timeWindow
  );

  // S'il y a plus d'entrée correspondante à cette adresse IP que la limite, la requête est refusée, sinon on ajoute le **timestamp** de la requête dans le tableau
  if (req.app.locals.requestCounts[ip].length >= maxRequests) {
    requestAuthorized = false;
  }else{
    // on ajoute le **timestamp** de la requête dans le tableau
    req.app.locals.requestCounts[ip].push(currentTime);
  }

  // Renvoi du jeton d'autorisation
  return requestAuthorized;
}

module.exports = limitRequests;