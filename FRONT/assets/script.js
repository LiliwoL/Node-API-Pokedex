let ENDPOINT = "http://127.0.0.1:5001";

// Appel
fetch( ENDPOINT ) // Fetch des datas : https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
    .then(
        // Premier fonction de callback, c'est la fonction en cas de succès
        // Le paramètre retournée est la réponse
        function ( response ) {
            console.info ( "@SUCCESS-01" );

            // Par defaut, l'API Joke renvoie les données au format JSON
            // Transformer la réponse en JSON interprétable
            response.json()
                .then(
                    // Succès de la promesse de transformation de la réponse en JSON
                    function ( datas ) {
                        // Succès
                        console.info ( "@SUCCESS-02" );
                        console.log( datas );

                        // Création d'un nouvel élément HTML
                        let divContenu = document.getElementById( "contenu" );
                        divContenu.innerHTML ( datas );
                    }
                    ,
                    // Erreur de la promesse de trasnformation de la réponse en JSON
                    function ( error ) {
                        console.error ( "@ERROR-01 de trasnformation de la réponse en JSON" );
                        console.error( error );
                    }
                )
        },

        // Le deuxième fonction de callback, c'est la fonction en cas d'échec
        // On aura comme paramètre l'erreur
        function ( error )
        {
            console.error ( error );
        }
    );


/*  -----------------------------------------------------
    2. Fonction de création des lignes HTML des users
    ----------------------------------------------------- */

function generateLine( datas )
{
    // Generae a pokemon line
}

    