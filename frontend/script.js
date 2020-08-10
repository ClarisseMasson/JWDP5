//on utilise fetch pour récupérer les données dans le back-end de tous les ours
fetch('http://localhost:3000/api/teddies/')

.then(function (response) {
    if (response.ok) {
        return response.json();
    }
    else {
        throw Error("Erreur de communication avec le serveur");

    }

})

.then(function (tableauOurs) {

    //On appelle ce qui va créer les cartes des ours en prennant en paramètre les données du serveur
    ajoutCartes(tableauOurs);

})

//on récupère l'erreur et on affiche un message pour l'utilisateur
.catch(function (error) {
    console.log(error);
    const produits = document.getElementById("produits");
    const messageErreur = document.createElement("p");
    produits.appendChild(messageErreur);
    messageErreur.classList.add("message_erreur");
    messageErreur.textContent = "Nos ours ne sont pas disponibles";
});


//Crée des cartes dynamiques avec les données des ours récupérés dans le serveur
function ajoutCartes(tableauOurs) {
//Pour tous les ours reçus...
for (const ours of tableauOurs) {

    console.log(ours.name);

    //...On créé des balises dynamiques de plusieurs sortes
    const cartesOurs = document.createElement("section");
    const imageOurs = document.createElement("img");
    const nomsOurs = document.createElement("h2");
    const descriptionOurs = document.createElement("p");
    const prixOurs = document.createElement("span");
    const boutonDetailOurs = document.createElement("a");

    //...On definie la source de l'image de l'ours
    imageOurs.setAttribute("src", ours.imageUrl);

    //...On précise le chemin du bouton en utilisant l'id(qui va varier)
    boutonDetailOurs.setAttribute("href", "details.html?identite_ours=" + ours._id);

    //...On va chercher l'élément où on va mettre nos contenus dynamiques
    const produits = document.getElementById("produits");

    //...On va définir l'organisation des balises en leur donnant leurs parents
    produits.appendChild(cartesOurs);
    cartesOurs.appendChild(imageOurs);
    cartesOurs.appendChild(nomsOurs);
    cartesOurs.appendChild(descriptionOurs);
    cartesOurs.appendChild(prixOurs);
    cartesOurs.appendChild(boutonDetailOurs);

    //...On va définir les classes pour le CSS
    cartesOurs.classList.add("cartes_ours");
    imageOurs.classList.add("image_ours");
    prixOurs.classList.add("prix_ours");
    boutonDetailOurs.classList.add("bouton_detail_ours");

    //...On valorise le contenu des balises créées
    nomsOurs.textContent = ours.name;
    descriptionOurs.textContent = ours.description;
    prixOurs.textContent = (ours.price / 100).toFixed(2) + "\u20ac";
    boutonDetailOurs.textContent = "en savoir +";

    }
}


