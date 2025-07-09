// Définition d'un tableau de vidéos
const videos = [
    {
        // Titre de la vidéo
        titre: "Simple man",
        // URL de la vignette de la vidéo
        vignette: "https://img.youtube.com/vi/LaiKvU6KYzA/mqdefault.jpg",
        // URL de la vidéo
        url: "https://www.youtube.com/watch?v=LaiKvU6KYzA&list=RDLaiKvU6KYzA&start_radio=1"
    },
    {
        titre: "Patience",
        vignette: "https://img.youtube.com/vi/YuInaaGj_qI/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=YuInaaGj_qI&list=RDYuInaaGj_qI&start_radio=1"
    },
    {
        titre: "Don't be Afraid",
        vignette: "https://img.youtube.com/vi/HsdjUNqbL5M/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=HsdjUNqbL5M&list=RDHsdjUNqbL5M&start_radio=1"
    }
  ];

// Fonction pour afficher une vidéo
function showVideo(index) {
    // Récupération de l'élément HTML qui contiendra la vidéo
    const videoContainer = document.getElementById('videoContainer');
    // Remplacement du contenu de l'élément par une iframe contenant la vidéo
    videoContainer.innerHTML =
        `<iframe width="100%" height="100%" src="${videos[index].url}" frameborder="0" allowfullscreen></iframe>`;
    // Affichage de l'élément
    videoContainer.style.display = 'block';
}

// Fonction pour initialiser la galerie de vidéos
function initGallery() {
    // Récupération de l'élément HTML qui contiendra la galerie
    const gallery = document.getElementById('gallery');
    // Vidage du contenu de l'élément
    gallery.innerHTML = '';
    // Boucle pour créer les éléments de la galerie
    for (let i = 0; i < videos.length; i++) {
        // Création d'un élément img pour la vignette de la vidéo
        const img = document.createElement('img');
        // Définition de la source de l'image
        img.src = videos[i].vignette;
        // Définition du texte alternatif de l'image
        img.alt = videos[i].titre;
        // Définition de la classe CSS de l'image
        img.className = 'thumbnail';
        // Définition de la fonction à exécuter lors du clic sur l'image
        img.onclick = function () {
            // Appel de la fonction showVideo avec l'index de la vidéo
            showVideo(i);
        };
        // Ajout de l'image à la galerie
        gallery.appendChild(img);
    }
    // Affichage de la galerie
    gallery.style.display = 'flex'; // ou 'block' selon ton CSS
    // Affichage de la première vidéo
    showVideo(0);
  }
// Lancement de la galerie au clic sur le bouton
document.getElementById('showGalleryBtn').onclick = function () {
    // Appel de la fonction initGallery
    initGallery();
  };
