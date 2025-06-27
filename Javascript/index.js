// Récupère le texte du h1 avec l'id "titre"
let hello = document.getElementById('titre').textContent;
// Affiche une alerte avec ce texte
alert(hello);


// 1. Select the '.menuBurger' element from the DOM.
let menuBurger = document.querySelector('.menuBurger'),
// 2. Select the '.basculant' element from the DOM.
basculant =  document.querySelector('.basculant')

// 3. Add a 'click' event listener to the '.basculant' element.
basculant.addEventListener('click', function (event) {
// 4. Toggle the 'active' class on the '.menuBurger' element.
menuBurger.classList.toggle('active')
});

// POP UP // 
// Affiche la pop-up automatiquement au chargement de la page
window.onload = function() {
  document.getElementById('popup').classList.add('active');
};

// Ferme la pop-up au clic sur la croix
document.getElementById('closeBtn').onclick = function() {
  document.getElementById('popup').classList.remove('active');
};


class Etudiant {
    constructor(age) {
        this.age = age;
    }
};

// instanciation d'objets Etudiant
var etudiant1 = new Etudiant(17);

// afficher l'age de etudiant1 dans la balise <div>
document.getElementById("resultat").innerHTML = "etudiant1 a " + etudiant1.age;


