//On créer notre bloc nav pour l'intégrer dynamiquement dans le html
creerNav();


function creerNav() {
    //On retrouve l'header existant dans le html
    let header = document.querySelector("header");
    //On créer notre balise nav
    let nav = document.createElement("nav");
    //On lui dit quel est son parent
    header.appendChild(nav);
    //On met dans nav un contenu
    nav.innerHTML = `
        <a href="Index.html"><img src="img/logo.svg" alt="logo Teddy by Orinoco" id="logo" /></a>
        <ul>
            <li><a href="panier.html"><i class="far fa-user"></i></a></li>
            <li><a href="panier.html"><i class="far fa-heart"></i></a></li>
            <li id="panier"><a href="panier.html"><i class="fas fa-shopping-cart"></i>Panier<span id="nombre_panier"></span></a></li>
        </ul>
    `;
    //On appelle directement la fonction qui met le panier à jour selon le local storage
    updateNavPanier();

};

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