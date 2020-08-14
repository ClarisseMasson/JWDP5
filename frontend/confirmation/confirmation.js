confirmerCommande();

//On r�cup�re le tableau ours stock� du localStorage
function confirmerCommande() {
    //On declare une variable qui va r�cup�rer les donn�es du tableau
    let confirmerLaCommande = localStorage.getItem('confirmationCommande');
    const identifiantCommande = document.querySelector("#identifiant p");
    const total = document.querySelector("#total span");
    let totalPrix = 0;
    //Si pas de donn�es, on mets un tableau vide
    if (confirmerLaCommande == null) {
        confirmerLaCommande = [];
        identifiantCommande.textContent = "Nous n'avons rien trouv\u00e9...";
        total.textContent = " 0 \u20ac";
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

        total.textContent = " " + (totalPrix / 100).toFixed(2) + "\u20ac";        
    }
   
};
