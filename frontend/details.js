//D'abord on va chercher dans l'url ce qui est le "?"
const urlOurs = window.location.search;
//on crée un objet utilitaire pour manipuler les paramètres de l'URL
var searchParams = new URLSearchParams(urlOurs);

//on va chercher l'id de l'ours dans l'url
const idOurs = searchParams.get("identite_ours");
console.log(idOurs);

//on utilise fetch pour récupérer les données dans le back-end en lui précisant de ne prendre en compte que l'objet ours ayant l'idOurs correspondant
fetch('http://localhost:3000/api/teddies/'+ idOurs)

    .then(response => response.json())

    .then(function (ours) {

        //je nomme où je vais mettre mon contenu dynamique
        var idNumeroOurs = document.getElementById("id_ours");
        //je mets mon contenu dynamique à l'intérieur
        idNumeroOurs.innerHTML = "<h2>ID N\u00b0 : </h2>" + "<p>" + ours._id;

        //je crée une image dynamique
        const imageOurs = document.createElement("img");
        //...On va chercher l'élément où on va mettre notre image dynamique
        let divImageOurs = document.getElementById("image_ours");
        //je mets mon image dynamique à l'intérieur
        divImageOurs.appendChild(imageOurs);
        //...On definie la source de l'image de l'ours
        imageOurs.setAttribute("src", ours.imageUrl);

        //je nomme où je vais mettre mon contenu dynamique
        var nomOurs = document.getElementById("nom_ours");
        //je mets mon contenu dynamique à l'intérieur
        nomOurs.innerHTML = "<h2>Mon nom : </h2>" + "<p>" + ours.name;

        //je nomme où je vais mettre mon contenu dynamique
        var histoireOurs = document.getElementById("histoire_ours");
        //je mets mon contenu dynamique à l'intérieur
        histoireOurs.innerHTML = "<h2>Mon histoire : </h2>" + "<p>" + ours.description;

        //je nomme où je vais mettre mon contenu dynamique
        var prixOurs = document.getElementById("prix_ours");
        //je mets mon contenu dynamique à l'intérieur
        prixOurs.innerHTML = (ours.price / 100).toFixed(2) + "\u20ac";

        //On va chercher le selecteur et on le nomme
        let selectionCouleur = document.getElementById("selection_couleur");

        //On crée une boucle avec pour chaque couleur reçu du tableau colors...
        for (const color of ours.colors) {

            console.log(color);

            //...On crée une élément option dynamique
            const colorOurs = document.createElement("option");
            //...On le place dans notre selecteur
            selectionCouleur.appendChild(colorOurs);
            //...On lui donne une value = à sa couleur
            colorOurs.setAttribute("value", color);
            //...On lui créé un contenu dynamique
            colorOurs.innerHTML = color;
        };




       

    });
