ajouterOursPanier();

//On r�cup�re le tableau ours stock� du localStorage
function ajouterOursPanier () {
    //On declare une variable qui va r�cup�rer les donn�es du tableau
    let tableauOursPanier = localStorage.getItem('tableauOursPourPanier');
    const panierOurs = document.getElementById("ours_panier");

    //Si pas de donn�es, on mets un tableau vide
    if (tableauOursPanier == null) {
        tableauOursPanier = [];
        const panierOursVide = document.createElement("div");
        panierOurs.appendChild(panierOursVide);
        panierOurs.innerHTML = '<div id="panier_vide">Votre panier est vide...</div>';
        const formulaire = document.getElementById("formulaire")
        formulaire.remove();

    }
    else {
        //sinon on analyse la cha�ne de caract�re Json, il peut ainsi comprendre que c'est un tableau
        console.log(tableauOursPanier);
        tableauOursPanier = JSON.parse(tableauOursPanier);
        //je lui indique que total prix egal 0 � la base
        let totalPrix = 0;
         //Pour chaque element ours re�us du tableauOursPanier...
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
         //on ins�re le r�sultat du prix total dans panierOurs...
        panierOurs.innerHTML += `
        <div id="prix_total"><h4>Total :</h4><strong>${(totalPrix / 100).toFixed(2)}\u20ac</strong></div>
        `;

        const monFormulaire = document.getElementById("mon_formulaire");

        //on lui dit que si on soumet le formulaire...
        monFormulaire.addEventListener("submit", (e) => {
            e.preventDefault();
         //on lui dit que si on soumet le formulaire...
           envoyerFormulaire();

        });
    }
   
};

//On v�rifie si le champ a bien au moins une lettre et que ce n'est pas un nombre
function verificationChamp(champ) {
    const regex = /^[a-z\u00C0-\u017F\-\']+$/i;
    if (champ.value.length < 1 || !regex.test(champ.value)) {
        indiqueErreur(champ, true);
        return false;
    }
    else {
        indiqueErreur(champ, false);
        return true;
    }
};
//On v�rifie si le champ a bien avec d'abord un ou des chiffres puis un espace et des lettres
function verificationAdresse(champ) {
    const regex = /^[0-9]+\s[\sa-z\u00C0-\u017F\-\']+$/i;
    if (champ.value.length < 2 || !regex.test(champ.value)) {
        indiqueErreur(champ, true);
        return false;
    }
    else {
        indiqueErreur(champ, false);
        return true;
    }
};

//On v�rifie si le champ est bien une adresse mail
function verificationMail(champ) {
    const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(champ.value)) {
        indiqueErreur(champ, true);
        return false;
    }
    else {
        indiqueErreur(champ, false);
        return true;
    }
}

//si le champ nous renvoie une erreur on ajoute une classe champ_invalid sinon on ajoute une classe champ_valid et puis on appelle le formulaireValidation
function indiqueErreur(champ, erreur) {
    if (erreur) {
        champ.classList.remove("champ_valid");
        champ.classList.add("champ_invalid");
    }

    else {
        champ.classList.remove("champ_invalid");
        champ.classList.add("champ_valid");

    }
    formulaireValidation();

};


//Il renvoie true si tous les champs sont valides
function formulaireValidation() {
    const Input = document.querySelectorAll("#formulaire form input");
    const nombreInput = Input.length;
    const listeClasseValide = document.getElementsByClassName("champ_valid");
//si le nombre de champs valides est = au nombre de champs � remplir il renvoie true
    if (listeClasseValide.length == nombreInput) {

        const bouton = document.getElementById("envoyer_formulaire");
        //on enl�ve la classe qui fait que le bouton est rouge(d�finie dans css)
        //on met la classe qui fait que le bouton est vert(d�finie dans css)
        bouton.classList.remove("erreur_bouton");
        bouton.classList.add("bon_bouton");
        return true;
    }
    else {
        //window.alert("mauvais");
        const bouton = document.getElementById("envoyer_formulaire");
        //on met la classe qui fait que le bouton est rouge(d�finie dans css)
        bouton.classList.add("erreur_bouton");
        return false;
    }
};

const monFormulaire = document.getElementById("mon_formulaire");

function envoyerFormulaire() {

//si tous les champs sont valides
    if (formulaireValidation()) {

        //on cr�� un un tableau dont les donn�es contact �quivalent au valeurs entr�s dans le formulaire
        //on lui donne ces noms pour que cela corresponde � ce que le serveur attend
        let maCommande = {};
        maCommande.contact = {
            "firstName": document.getElementById("firstname").value,
            "lastName": document.getElementById("lastname").value,
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value,
            "email": document.getElementById("email").value
        };

        //on r�cup�re le tableau avec les ours dans le panier et on traduit le Json du localStorage
        let tableauOursPanier = localStorage.getItem('tableauOursPourPanier');
        tableauOursPanier = JSON.parse(tableauOursPanier);

        //on ajoute l'id de l'ours pour chaque ours dans le tableau =
        maCommande.products = [];
        for (const ours of tableauOursPanier) {
            maCommande.products.push(ours._id);
        };

        //on traduit l'ensemble de la Commande en JSON
        console.log(JSON.stringify(maCommande));

        //on lui pr�cise que les donn�es sont en JSON
        const monFormat = new Headers();
        monFormat.append('Content-Type', 'application/json');

        //on poste notre tableau contact et les id des ours du panier
        const monFormatCommande = {
            method: 'POST',
            headers: monFormat,
            body: JSON.stringify(maCommande)

        };

         //on envoie nos donn�es � cette adresse et on r�cup�re des donn�es
        fetch("http://localhost:3000/api/teddies/order", monFormatCommande)
            .then(response => response.json())

             //on demande au serveur de nous donner la confirmation commande (avec l'identifiant de commande, le contact et les produits)

            .then(function (confirmation) {
                console.log(confirmation.orderId);
                localStorage.setItem("confirmationCommande", JSON.stringify(confirmation));
               //on est renvoy� directement sur la page confirmation
               window.location.href = "confirmation.html";
            });
    }
    else {
        console.log("erreur_formulaire");
    }
};

