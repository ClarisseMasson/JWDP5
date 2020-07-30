updateNavPanier();

//On met le nombre d'élément panier à jour en utilisant les données stockés dans le local storage
function updateNavPanier() {
    //On declare une variable qui va prendre des données dans le localstorage
    let nombreProduitPanier = localStorage.getItem('nombreOursAjout');
    //On lui précise que c'est un chiffre entier
    nombreProduitPanier = parseInt(nombreProduitPanier);

    //je nomme où je vais mettre mon contenu dynamique
    var navPanier = document.getElementById("nombre_panier");

    //Si pas de données on affiche (0)
    if (isNaN(nombreProduitPanier)) {
        navPanier.innerHTML = " (0)";
    }
    //Si il ya des données on affiche (le nombre danas nombreProduitPanier)
    else {
        navPanier.innerHTML = " (" + nombreProduitPanier + ")";
    }

};

confirmerCommande();

//On récupère le tableau ours stocké du localStorage
function confirmerCommande() {
    //On declare une variable qui va récupérer les données du tableau
    let confirmerLaCommande = localStorage.getItem('confirmationCommande');
    let identifiantCommande = document.querySelector("#identifiant p");
    let total = document.querySelector("#total span");
    let totalPrix = 0;
    //Si pas de données, on mets un tableau vide
    if (confirmerLaCommande == null) {
        confirmerLaCommande = [];
        identifiantCommande.innerHTML = "Nous n'avons rien trouv\u00e9...";
        total.innerHTML = " " + totalPrix + "\u20ac";
        total.classList.add("erreur");

    }
    else {
        //sinon on analyse la chaîne de caractère Json, il peut ainsi comprendre que c'est un tableau
        console.log(confirmerLaCommande);
        confirmerLaCommande = JSON.parse(confirmerLaCommande);
        identifiantCommande.innerHTML = confirmerLaCommande.orderId;

        for (const produit of confirmerLaCommande.products) {
           totalPrix += produit.price;
        };

        total.innerHTML = " " +(totalPrix / 100).toFixed(2) + "\u20ac";        
    }
   
};
