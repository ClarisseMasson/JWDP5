//D'abord on va chercher dans l'url ce qui est le "?"
const urlOurs = window.location.search;
//on crée un objet utilitaire pour manipuler les paramètres de l'URL
const searchParams = new URLSearchParams(urlOurs);

//on va chercher l'id de l'ours dans l'url
const idOurs = searchParams.get("identite_ours");

if (searchParams.has("identite_ours")) {
    console.log(idOurs);
    const carteIdentite = document.getElementById('carte_identite');
    carteIdentite.classList.add("bonne_url");
    executerFetch();
}
else {
    const carteIdentite = document.getElementById('carte_identite');
    carteIdentite.classList.add("erreur_url");
    while (carteIdentite.firstChild) {
        carteIdentite.removeChild(carteIdentite.firstChild);
    };
    carteIdentite.innerHTML += `
            <img src="img/ours_pleure.svg" alt="illustration ours triste probleme url">
            <div class="message_erreur">
                <h1>Aucun ours<br/>n'a été sélectionné</h1>
                <p>Veuillez choisir votre ours ci-dessous</p>
                <a href="index.html">Choisir</a>
            </div>           
            `;
};

function executerFetch() {
    //on utilise fetch pour récupérer les données dans le back-end en lui précisant de ne prendre en compte que l'objet ours ayant l'idOurs correspondant
    fetch('http://localhost:3000/api/teddies/'+ idOurs)

    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw Error("id introuvable");

        }
    })

    .then(function (ours) {


        //je nomme où je vais mettre mon contenu dynamique
        let ajoutPanier = document.getElementById("ajouter_panier");
        //quand je clique il ajoute un nombre au lien panier et transmet tableauOursPanier
        //je le place dans mon fetch pour qu'il sache ce qu'il y a dans mon ours
        ajoutPanier.addEventListener("click", () => {
            const selectionCouleur = document.getElementById("selection_couleur");
            if (selectionCouleur.selectedIndex == 0) {
                window.alert("Veuillez choisir une couleur");
            }
            else {
                nombreOursAjout();
                var couleurSelectionne = selectionCouleur.options[selectionCouleur.selectedIndex].value;
                ours.couleurSelectionne = couleurSelectionne;
                console.log(couleurSelectionne);
                ajouterOursPanier(ours);
            }
        });

        //je nomme où je vais mettre mon contenu dynamique
        const idNumeroOurs = document.getElementById("id_ours");
        //je mets mon contenu dynamique à l'intérieur
        idNumeroOurs.innerHTML = "<h2>ID N\u00b0 : </h2>" + "<p>" + ours._id;

        //je crée une image dynamique
        const imageOurs = document.createElement("img");
        //...On va chercher l'élément où on va mettre notre image dynamique
        const divImageOurs = document.getElementById("image_ours");
        //je mets mon image dynamique à l'intérieur
        divImageOurs.appendChild(imageOurs);
        //...On definie la source de l'image de l'ours
        imageOurs.setAttribute("src", ours.imageUrl);

        //je nomme où je vais mettre mon contenu dynamique
        const nomOurs = document.getElementById("nom_ours");
        //je mets mon contenu dynamique à l'intérieur
        nomOurs.innerHTML = "<h2>Mon nom : </h2>" + "<p>" + ours.name;

        //je nomme où je vais mettre mon contenu dynamique
        const histoireOurs = document.getElementById("histoire_ours");
        //je mets mon contenu dynamique à l'intérieur
        histoireOurs.innerHTML = "<h2>Mon histoire : </h2>" + "<p>" + ours.description;

        //je nomme où je vais mettre mon contenu dynamique
        const prixOurs = document.getElementById("prix_ours");
        //je mets mon contenu dynamique à l'intérieur
        prixOurs.textContent = (ours.price / 100).toFixed(2) + "\u20ac";

        //On va chercher le selecteur et on le nomme
        const selectionCouleur = document.getElementById("selection_couleur");

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

    })

    //on récupère l'erreur et on affiche un message pour l'utilisateur
        .catch(function (error) {
        console.log(error);
        const carteIdentite = document.getElementById('carte_identite');
        carteIdentite.classList.add("erreur_url");
        while (carteIdentite.firstChild) {
            carteIdentite.removeChild(carteIdentite.firstChild);
        };
        carteIdentite.innerHTML += `
            <img src="img/ours_confu.svg" alt="illustration ours confu probleme url">
            <div class="message_erreur">
                <h1>Votre ours<br/>est introuvable</h1>
                <p>Produit indisponible...<br/>Voulez-vous choisir un autre ours ?</p>
                <a href="index.html">Choisir</a>
            </div>           
            `;
     })

}

//On demande d'ajouter +1 (fonction appelée quand on clique 34-41)
function nombreOursAjout() {
    //On declare une variable qui va prendre des données dans le localstorage
    let nombreProduitPanier = localStorage.getItem('nombreOursAjout');
    //On lui précise que c'est un chiffre entier
    nombreProduitPanier = parseInt(nombreProduitPanier);
    console.log(nombreProduitPanier);
    //Si pas de données, la valeur est de 0
    if (isNaN(nombreProduitPanier)) {
        nombreProduitPanier = 0;
    }
    //On ajoute 1 à la variable nombreProduitPanier et on le stocke dans le localstorage, dans "nombreOursAjout"
    localStorage.setItem("nombreOursAjout", nombreProduitPanier+1);
    //On appelle la fonction qui nous sert à écrire à la suite de notre lien panier le nombre de fois on a cliqué
    updateNavPanier();
};

//On récupère le tableau ours stocké du localStorage (fonction appelée quand on clique 34-41)
function ajouterOursPanier(ours) {
    //On declare une variable qui va récupérer les données du tableau
    let tableauOursPanier = localStorage.getItem('tableauOursPourPanier');
    //Si pas de données, on mets un tableau vide
    if (tableauOursPanier == null) {
        tableauOursPanier = [];
    }
    else {
        //sinon on analyse la chaîne de caractère Json, il peut ainsi comprendre que c'est un tableau
        tableauOursPanier = JSON.parse(tableauOursPanier);
    }
    //on ajoute le tableau ours dans tableauOusPanier
    tableauOursPanier.push(ours);
    console.log(tableauOursPanier.lenght);
    //on ajoute ce tableau au localstorage en le repassant en JSON
    localStorage.setItem("tableauOursPourPanier", JSON.stringify(tableauOursPanier));

};



