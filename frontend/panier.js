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

ajouterOursPanier();

//On récupère le tableau ours stocké du localStorage
function ajouterOursPanier () {
    //On declare une variable qui va récupérer les données du tableau
    let tableauOursPanier = localStorage.getItem('tableauOursPourPanier');
    let panierOurs = document.getElementById("ours_panier")
    //Si pas de données, on mets un tableau vide
    if (tableauOursPanier == null) {
        tableauOursPanier = [];
        const panierOursVide = document.createElement("div");
        panierOurs.appendChild(panierOursVide);
        panierOurs.innerHTML = '<div id="panier_vide">Votre panier est vide...</div>';  
    }
    else {
        //sinon on analyse la chaîne de caractère Json, il peut ainsi comprendre que c'est un tableau
        console.log(tableauOursPanier);
        tableauOursPanier = JSON.parse(tableauOursPanier);
        //je lui indique que total prix egal 0 à la base
        var totalPrix = 0;
         //Pour chaque element ours reçus du tableauOursPanier...
        for (const elementOurs of tableauOursPanier) {
            panierOurs.innerHTML += `
            <section class=ours_panier--selectionne>
                <img src="${elementOurs.imageUrl}"></img>
                <div class="nom_id_ours">
                    <div class="nom_ours"><h3>Nom :</h3><p>${elementOurs.name}</p></div>
                    <div class="id_ours"><h3>Id :</h3><p>${elementOurs._id}</p></div>
                </div>
                <div class="couleur_ours"><select disabled="false"><option>${elementOurs.couleurSelectionne}</option></select></div>
                <div class="prix">${(elementOurs.price / 100).toFixed(2)}\u20ac</div>
            </section>
            `;
            totalPrix += elementOurs.price;
        
        };

        panierOurs.innerHTML += `
        <div id="prix_total"><h4>Total :</h4><strong>${(totalPrix / 100).toFixed(2)}\u20ac</strong></div>
        `;
    }
   
};

function indiqueErreur(champ, erreur) {
    if (erreur)
        champ.classList.add("champ_invalid");
    else
        champ.classList.remove("champ_invalid");
};

function indiqueValid(champ, validation){
    if (validation) {
        champ.classList.add("champ_valid");
    }
    else {
        champ.classList.remove("champ_valid");
    }
};

function verificationChamp(champ) {
    var regex = /^[a-zA-ZÀ-ú\-\s]*/i;
    if (champ.value.length < 1 || !regex.test(champ.value)) {
        indiqueErreur(champ, true);
        indiqueValid(champ, false);
        return false;
    }
    else {
        indiqueErreur(champ, false);
        indiqueValid(champ, true);
        return true;
    }
};

function verificationAdresse(champ) {
    var regex = /^[0-9]+\s+[a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+$/i;
    if (champ.value.length < 2 || !regex.test(champ.value)) {
        indiqueErreur(champ, true);
        indiqueValid(champ, false);
        return false;
    }
    else {
        indiqueErreur(champ, false);
        indiqueValid(champ, true);
        return true;
    }
};

function verificationMail(champ) {
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(champ.value)) {
        indiqueErreur(champ, true);
        indiqueValid(champ, false);
        return false;
    }
    else {
        indiqueErreur(champ, false);
        indiqueValid(champ, true);
        return true;
    }
}

let monFormulaire = document.getElementById("mon_formulaire")

monFormulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formulaireValidation()) {

        var maCommande = {};
        maCommande.contact = {
            "firstName": document.getElementById("firstname").value,
            "lastName": document.getElementById("lastname").value,
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value,
            "email": document.getElementById("email").value
        };
        let tableauOursPanier = localStorage.getItem('tableauOursPourPanier');
        tableauOursPanier = JSON.parse(tableauOursPanier);

        maCommande.products = [];
        for (const ours of tableauOursPanier) {
            maCommande.products.push(ours._id);
        };

        console.log(JSON.stringify(maCommande));

        var monFormat = new Headers();
        monFormat.append('Content-Type', 'application/json');

        var monFormatCommande = {
            method: 'POST',
            headers: monFormat,
            body: JSON.stringify(maCommande)

        };

        fetch("http://localhost:3000/api/teddies/order", monFormatCommande)
            .then(response => response.json())

            .then(function (confirmation) {
                console.log(confirmation.orderId);
                localStorage.setItem("confirmationCommande", JSON.stringify(confirmation));
                window.location.href = "confirmation.html";
            });
    }
    else {
        window.alert("nope");
    }

});


function formulaireValidation() {
    let Input = document.querySelectorAll("#formulaire form input");
    let nombreInput = Input.length;
    let listeClasseValide = document.getElementsByClassName("champ_valid");
    if (listeClasseValide.length == nombreInput) {
        return true;
    }
    else {
        return false;

    }

};