updateNavPanier();

//On met le nombre d'élément panier à jour en utilisant les données stockés dans le local storage
function updateNavPanier() {
       
    //On declare une variable qui va prendre des données dans le localstorage
    let nombreProduitPanier = localStorage.getItem('nombreOursAjout');
    //On lui précise que c'est un chiffre entier
    nombreProduitPanier = parseInt(nombreProduitPanier);

    //je nomme où je vais mettre mon contenu dynamique
    const navPanier = document.getElementById("nombre_panier");

    //Si pas de données on affiche (0)
    if (isNaN(nombreProduitPanier)) {
        navPanier.textContent = " (0)";
    }
    //Si il ya des données on affiche (le nombre danas nombreProduitPanier)
    else {
        navPanier.textContent = " (" + nombreProduitPanier + ")";
    }

};