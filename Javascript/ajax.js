//Exercice 6 

// Récupération des éléments du DOM
const btnBlague = document.getElementById("btnBlague");
const blagueDiv = document.getElementById("blague");
// Fonction pour afficher l'état de chargement avec animation "..."
function afficherChargement() {
    blagueDiv.innerHTML = '<span class="loading">Chargement<span class="dots"></span></span>';
}
// Fonction pour récupérer et afficher une blague aléatoire
async function obtenirBlague() {
    try {
        // Affiche le message de chargement avant la requête
        afficherChargement();
        // Appel de l'API
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        // Vérifie si la requête a réussi
        if (!response.ok) {
            throw new Error("Erreur lors du chargement de la blague.");
        }
        // Conversion de la réponse en objet JSON
        const data = await response.json();
        // Affichage du setup en gras puis de la punchline en dessous
        blagueDiv.innerHTML = `
    <span class="setup">${data.setup}</span>
    <span>${data.punchline}</span>
    `;
    } catch (error) {
        // Affichage d'un message d'erreur en cas de problème
        blagueDiv.textContent = "Impossible de charger une blague pour le moment.";
        console.error(error);
    }
}
// Événement au clic sur le bouton
btnBlague.addEventListener("click", obtenirBlague);

//Exercice 7
// On récupère les éléments
const searchInput = document.getElementById("searchInput");
const btnRecherche = document.getElementById("btnRecherche");
const resultatsDiv = document.getElementById("resultats");

// Fonction de recherche
async function rechercherPersonnage() {
    const recherche = searchInput.value.trim();
    // Si le champ est vide
    if (recherche === "") {
        resultatsDiv.textContent = "Veuillez saisir un nom.";
        return;
    }
    // Chargement
    resultatsDiv.textContent = "Chargement...";
     try {
        // Appel API (AJAX)
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(recherche)}`
        );
        // Si aucun personnage trouvé (404 ou results vide)
        if (response.status === 404) {
            resultatsDiv.textContent = "Aucun personnage trouvé.";
            return;
        }
        const data = await response.json();
        const personnages = data.results;
        // Si aucun résultat
        if (personnages.length === 0) {
            resultatsDiv.textContent = "Aucun personnage trouvé.";
            return;
        }
        // On vide et on affiche chaque personnage
        resultatsDiv.innerHTML = "";

        personnages.forEach(personnage => {
            resultatsDiv.innerHTML += `
            <img src="${personnage.image}" alt="${personnage.name}" width="120" />
            <p><strong>${personnage.name}</strong></p>
            <p>Statut : ${personnage.status}</p>
          `;
        });

    } catch (error) {
        resultatsDiv.textContent = "Une erreur est survenue.";
    }
}
// Au clic sur le bouton
btnRecherche.addEventListener("click", rechercherPersonnage);

//Exercice 8 
// Fonction principale pour récupérer et afficher les todos complétés
async function afficherTodos() {
    const messageDiv = document.getElementById("message");
    const tbody = document.querySelector("#tableTodos tbody");
    messageDiv.textContent = "Chargement...";
    // try pour gérer les erreurs, catch pour afficher un message si échec
    try {
        // Appel AJAX (Fetch) vers l'API
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        // Vérifie si la réponse est correcte
        if (!response.ok) {
            messageDiv.textContent = "Erreur lors de la récupération des todos.";
            return;
        }
        // Conversion de la réponse en JSON
        const todos = await response.json();
        // On filtre uniquement les todos où completed === true
        const todosCompletés = todos.filter(todo => todo.completed === true);
        // Si aucun todo complété
        if (todosCompletés.length === 0) {
            messageDiv.textContent = "Aucun todo complété trouvé.";
            tbody.innerHTML = "";
            return;
        }
        // On vide le message et on vide le tableau
        messageDiv.textContent = "";
        tbody.innerHTML = "";
        // Pour chaque todo complété, on ajoute une ligne dans le tableau
        todosCompletés.forEach(todo => {
            const ligne = `<tr>
            <td>${todo.id}</td>
            <td>${todo.title}</td>
            <td>${todo.completed}</td>
          </tr>`;
            tbody.innerHTML += ligne;
        });
    } catch (error) {
        // Gestion des erreurs réseau
        messageDiv.textContent = "Une erreur est survenue.";
        console.error(error);
    }
}
// On appelle la fonction au chargement du document
afficherTodos();

//Exercice 9 
const searchInput = document.getElementById("searchInput");
const resultatsDiv = document.getElementById("resultats");

let debounceTimer = null; // Variable pour le debounce

// Fonction avec debounce de 500ms pour éviter trop de requêtes
function rechercherPays() {
    clearTimeout(debounceTimer); // On annule le timer précédent
    debounceTimer = setTimeout(() => {
        const recherche = searchInput.value.trim();
        // Si moins de 3 caractères, on ne recherche pas
        if (recherche.length < 3) {
            resultatsDiv.textContent = "";
            return;
        }
        afficherChargement();
        faireRechercheAPI(recherche);
    }, 500); // Délai de 500ms avant d'appeler l'API
}
// Fonction pour afficher le chargement
function afficherChargement() {
    resultatsDiv.textContent = "Chargement...";
}
// Fonction pour afficher aucun résultat
function afficherAucunResultat() {
    resultatsDiv.textContent = "Aucun pays trouvé.";
}
// Fonction principale de recherche via l'API
async function faireRechercheAPI(recherche) {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(recherche)}`
        );
        // Si 404 = aucun pays trouvé
        if (response.status === 404) {
            afficherAucunResultat();
            return;
        }
        // Si erreur autre
        if (!response.ok) {
            resultatsDiv.textContent = "Une erreur est survenue.";
            return;
        }
        const data = await response.json();
        const pays = data[0]; // On prend le premier pays trouvé
        // Affichage officiel du nom, drapeau, capitale, population
        resultatsDiv.innerHTML = `
          <p><strong>Nom officiel :</strong> ${pays.name.official}</p>
          <p><strong>Drapeau :</strong> ${pays.flags.emoji}</p>
          <p><strong>Capitale :</strong> ${pays.capital ? pays.capital[0] : "Non disponible"}</p>
          <p><strong>Population :</strong> ${pays.population.toLocaleString()}</p>
        `;
    } catch (error) {
        resultatsDiv.textContent = "Une erreur est survenue.";
        console.error(error);
    }
}
// Événement sur chaque frappe de touche
searchInput.addEventListener("keyup", rechercherPays);

//Exercice 10
const searchInput = document.getElementById("searchInput");
const btnMeteo = document.getElementById("btnMeteo");
const resultatsDiv = document.getElementById("resultats");

// Fonction principale : géocodage + météo (chaînée avec async/await)
async function afficherMeteo() {
    const ville = searchInput.value.trim();

    // Si le champ est vide
    if (ville === "") {
        resultatsDiv.textContent = "Veuillez saisir une ville.";
        return;
    }
    resultatsDiv.textContent = "Chargement...";
    try {
        // Étape 1 : Géocodage (ville → coordonnées GPS)
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=1&language=fr`
        );
        // Si ville introuvable (404 ou résultat vide)
        if (!geoResponse.ok) {
            resultatsDiv.textContent = "Ville introuvable.";
            return;
        }
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            resultatsDiv.textContent = "Ville introuvable.";
            return;
        }
        const { latitude, longitude, name } = geoData.results[0];
        // Étape 2 : Météo actuelle + prévisions 3 jours
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/weather?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&windspeed_unit=kmh`
        );
        if (!weatherResponse.ok) {
            resultatsDiv.textContent = "Erreur lors de la récupération de la météo.";
            return;
        }
        const weatherData = await weatherResponse.json();
        const current = weatherData.current_weather;
        // Affichage joli de la météo
        resultatsDiv.innerHTML = `
          <p><strong>Ville :</strong> ${name}</p>
          <p><strong>Température :</strong> ${current.temperature}°C</p>
          <p><strong>Vent :</strong> ${current.windspeed} km/h</p>
          <p><strong>Code météo :</strong> ${current.weathercode}</p>

          <h3>Prévisions sur 3 jours</h3>
          <ul>
            ${weatherData.daily.time.map((date, i) => `
              <li>
                ${date} : 
                Max ${weatherData.daily.temperature_2m_max[i]}°C, 
                Min ${weatherData.daily.temperature_2m_min[i]}°C,
                Précipitations ${weatherData.daily.precipitation_sum[i]} mm
              </li>
            `).join("")}
          </ul>
        `;
    } catch (error) {
        resultatsDiv.textContent = "Une erreur est survenue.";
        console.error(error);
    }
}
// Au clic sur le bouton
btnMeteo.addEventListener("click", afficherMeteo);

