updateNavPanier();

//On met le nombre d'�l�ment panier � jour en utilisant les donn�es stock�s dans le local storage
function updateNavPanier() {
    //On declare une variable qui va prendre des donn�es dans le localstorage
    let nombreProduitPanier = localStorage.getItem('nombreOursAjout');
    //On lui pr�cise que c'est un chiffre entier
    nombreProduitPanier = parseInt(nombreProduitPanier);

    //je nomme o� je vais mettre mon contenu dynamique
    var navPanier = document.getElementById("nombre_panier");

    //Si pas de donn�es on affiche (0)
    if (isNaN(nombreProduitPanier)) {
        navPanier.innerHTML = " (0)";
    }
    //Si il ya des donn�es on affiche (le nombre danas nombreProduitPanier)
    else {
        navPanier.innerHTML = " (" + nombreProduitPanier + ")";
    }

};

confirmerCommande();

//On r�cup�re le tableau ours stock� du localStorage
function confirmerCommande() {
    //On declare une variable qui va r�cup�rer les donn�es du tableau
    let confirmerLaCommande = localStorage.getItem('confirmationCommande');
    let identifiantCommande = document.querySelector("#identifiant p");
    let total = document.querySelector("#total span");
    let totalPrix = 0;
    //Si pas de donn�es, on mets un tableau vide
    if (confirmerLaCommande == null) {
        confirmerLaCommande = [];
        identifiantCommande.innerHTML = "Nous n'avons rien trouv\u00e9...";
        total.innerHTML = " " + totalPrix + "\u20ac";
        total.classList.add("erreur");

    }
    else {
        //sinon on analyse la cha�ne de caract�re Json, il peut ainsi comprendre que c'est un tableau
        console.log(confirmerLaCommande);
        confirmerLaCommande = JSON.parse(confirmerLaCommande);
        identifiantCommande.innerHTML = confirmerLaCommande.orderId;

        for (const produit of confirmerLaCommande.products) {
           totalPrix += produit.price;
        };

        total.innerHTML = " " +(totalPrix / 100).toFixed(2) + "\u20ac";        
    }
   
};
