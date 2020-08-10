//on utilise fetch pour r�cup�rer les donn�es dans le back-end de tous les ours
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

    //On appelle ce qui va cr�er les cartes des ours en prennant en param�tre les donn�es du serveur
    ajoutCartes(tableauOurs);

})

//on r�cup�re l'erreur et on affiche un message pour l'utilisateur
.catch(function (error) {
    console.log(error);
    const produits = document.getElementById("produits");
    const messageErreur = document.createElement("p");
    produits.appendChild(messageErreur);
    messageErreur.classList.add("message_erreur");
    messageErreur.textContent = "Nos ours ne sont pas disponibles";
});


//Cr�e des cartes dynamiques avec les donn�es des ours r�cup�r�s dans le serveur
function ajoutCartes(tableauOurs) {
//Pour tous les ours re�us...
for (const ours of tableauOurs) {

    console.log(ours.name);

    //...On cr�� des balises dynamiques de plusieurs sortes
    const cartesOurs = document.createElement("section");
    const imageOurs = document.createElement("img");
    const nomsOurs = document.createElement("h2");
    const descriptionOurs = document.createElement("p");
    const prixOurs = document.createElement("span");
    const boutonDetailOurs = document.createElement("a");

    //...On definie la source de l'image de l'ours
    imageOurs.setAttribute("src", ours.imageUrl);

    //...On pr�cise le chemin du bouton en utilisant l'id(qui va varier)
    boutonDetailOurs.setAttribute("href", "details.html?identite_ours=" + ours._id);

    //...On va chercher l'�l�ment o� on va mettre nos contenus dynamiques
    const produits = document.getElementById("produits");

    //...On va d�finir l'organisation des balises en leur donnant leurs parents
    produits.appendChild(cartesOurs);
    cartesOurs.appendChild(imageOurs);
    cartesOurs.appendChild(nomsOurs);
    cartesOurs.appendChild(descriptionOurs);
    cartesOurs.appendChild(prixOurs);
    cartesOurs.appendChild(boutonDetailOurs);

    //...On va d�finir les classes pour le CSS
    cartesOurs.classList.add("cartes_ours");
    imageOurs.classList.add("image_ours");
    prixOurs.classList.add("prix_ours");
    boutonDetailOurs.classList.add("bouton_detail_ours");

    //...On valorise le contenu des balises cr��es
    nomsOurs.textContent = ours.name;
    descriptionOurs.textContent = ours.description;
    prixOurs.textContent = (ours.price / 100).toFixed(2) + "\u20ac";
    boutonDetailOurs.textContent = "en savoir +";

    }
}


