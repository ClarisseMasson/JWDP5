updateNavPanier();

//On met le nombre d'�l�ment panier � jour en utilisant les donn�es stock�s dans le local storage
function updateNavPanier() {
       
    //On declare une variable qui va prendre des donn�es dans le localstorage
    let nombreProduitPanier = localStorage.getItem('nombreOursAjout');
    //On lui pr�cise que c'est un chiffre entier
    nombreProduitPanier = parseInt(nombreProduitPanier);

    //je nomme o� je vais mettre mon contenu dynamique
    const navPanier = document.getElementById("nombre_panier");

    //Si pas de donn�es on affiche (0)
    if (isNaN(nombreProduitPanier)) {
        navPanier.textContent = " (0)";
    }
    //Si il ya des donn�es on affiche (le nombre danas nombreProduitPanier)
    else {
        navPanier.textContent = " (" + nombreProduitPanier + ")";
    }

};