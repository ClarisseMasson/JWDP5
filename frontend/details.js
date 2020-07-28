//D'abord on va chercher dans l'url ce qui est le "?"
const urlOurs = window.location.search;
//on cr�e un objet utilitaire pour manipuler les param�tres de l'URL
var searchParams = new URLSearchParams(urlOurs);

//on va chercher l'id de l'ours dans l'url
const idOurs = searchParams.get("identite_ours");
console.log(idOurs);

//on utilise fetch pour r�cup�rer les donn�es dans le back-end en lui pr�cisant de ne prendre en compte que l'objet ours ayant l'idOurs correspondant
fetch('http://localhost:3000/api/teddies/'+ idOurs)

    .then(response => response.json())

    .then(function (ours) {

        //je nomme o� je vais mettre mon contenu dynamique
        var idNumeroOurs = document.getElementById("id_ours");
        //je mets mon contenu dynamique � l'int�rieur
        idNumeroOurs.innerHTML = "<h2>ID N\u00b0 : </h2>" + "<p>" + ours._id;

        //je cr�e une image dynamique
        const imageOurs = document.createElement("img");
        //...On va chercher l'�l�ment o� on va mettre notre image dynamique
        let divImageOurs = document.getElementById("image_ours");
        //je mets mon image dynamique � l'int�rieur
        divImageOurs.appendChild(imageOurs);
        //...On definie la source de l'image de l'ours
        imageOurs.setAttribute("src", ours.imageUrl);

        //je nomme o� je vais mettre mon contenu dynamique
        var nomOurs = document.getElementById("nom_ours");
        //je mets mon contenu dynamique � l'int�rieur
        nomOurs.innerHTML = "<h2>Mon nom : </h2>" + "<p>" + ours.name;

        //je nomme o� je vais mettre mon contenu dynamique
        var histoireOurs = document.getElementById("histoire_ours");
        //je mets mon contenu dynamique � l'int�rieur
        histoireOurs.innerHTML = "<h2>Mon histoire : </h2>" + "<p>" + ours.description;

        //je nomme o� je vais mettre mon contenu dynamique
        var prixOurs = document.getElementById("prix_ours");
        //je mets mon contenu dynamique � l'int�rieur
        prixOurs.innerHTML = (ours.price / 100).toFixed(2) + "\u20ac";

        //On va chercher le selecteur et on le nomme
        let selectionCouleur = document.getElementById("selection_couleur");

        //On cr�e une boucle avec pour chaque couleur re�u du tableau colors...
        for (const color of ours.colors) {

            console.log(color);

            //...On cr�e une �l�ment option dynamique
            const colorOurs = document.createElement("option");
            //...On le place dans notre selecteur
            selectionCouleur.appendChild(colorOurs);
            //...On lui donne une value = � sa couleur
            colorOurs.setAttribute("value", color);
            //...On lui cr�� un contenu dynamique
            colorOurs.innerHTML = color;
        };




       

    });
