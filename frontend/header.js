//On cr�er notre bloc nav pour l'int�grer dynamiquement dans le html
creerNav();


function creerNav() {
    //On retrouve l'header existant dans le html
    let header = document.querySelector("header");
    //On cr�er notre balise nav
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
    //On appelle directement la fonction qui met le panier � jour selon le local storage
    updateNavPanier();

};

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