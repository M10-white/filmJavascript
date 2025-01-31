const API_KEY = "d48716f1";
const POPULAR_MOVIES = ["Batman", "Inception", "Interstellar", "Titanic", "Avatar", "Gladiator", "The Matrix"];
const RANDOM_KEYWORDS = ["space", "war", "love", "future", "magic", "adventure", "hero", "spy"];
let page = 1;  // Pagination pour charger plus de films
let isLoading = false;  // Évite les chargements multiples

async function fetchPopularMovies() {
    let popularContainer = document.getElementById("popular-movies");
    popularContainer.innerHTML = "";

    for (let title of POPULAR_MOVIES) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
        const data = await response.json();
        
        if (data.Response === "True") {
            data.Search.forEach(movie => {
                let movieCard = `
                    <div class="movie-card">
                        <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                        <p>Année : ${movie.Year}</p>
                    </div>
                `;
                popularContainer.innerHTML += movieCard;
            });
        }
    }
}

async function fetchRandomMovies() {
    if (isLoading) return;  // Empêche de recharger plusieurs fois en même temps
    isLoading = true;

    document.getElementById("loader").classList.remove("hidden");

    let allMoviesContainer = document.getElementById("all-movies");
    let keyword = RANDOM_KEYWORDS[Math.floor(Math.random() * RANDOM_KEYWORDS.length)];

    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}&page=${page}`);
    const data = await response.json();

    if (data.Response === "True") {
        data.Search.forEach(movie => {
            let movieCard = `
                <div class="movie-card">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>Année : ${movie.Year}</p>
                </div>
            `;
            allMoviesContainer.innerHTML += movieCard;
        });

        page++; // Augmente la page pour le prochain chargement
    }

    isLoading = false;
}

async function fetchMovies() {
    let searchQuery = document.getElementById("search-input").value.toLowerCase();

    if (searchQuery.trim() === "") {
        document.getElementById("all-movies").innerHTML = ""; // Efface les films actuels
        page = 1;  // Réinitialise la pagination
        fetchRandomMovies();  // Recharge des films aléatoires
        return;
    }

    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
    const data = await response.json();

    let allMoviesContainer = document.getElementById("all-movies");
    allMoviesContainer.innerHTML = "";

    if (data.Response === "True") {
        data.Search.forEach(movie => {
            let movieCard = `
                <div class="movie-card">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>Année : ${movie.Year}</p>
                </div>
            `;
            allMoviesContainer.innerHTML += movieCard;
        });
    } else {
        allMoviesContainer.innerHTML = "<p>Aucun film trouvé.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let leftArrow = document.querySelector(".left");
    if (leftArrow) {
        leftArrow.addEventListener("click", scrollLeft);
    }

    let rightArrow = document.querySelector(".right");
    if (rightArrow) {
        rightArrow.addEventListener("click", scrollRight);
    }
});

function scrollLeft() {
    let container = document.getElementById("popular-movies");
    if (container) {
        container.scrollBy({ left: ( -container.clientWidth + -900 ) / 2, behavior: "smooth" });
    } else {
        console.error("Element with ID 'popular-movies' not found.");
    }
}

function scrollRight() {
    let container = document.getElementById("popular-movies");
    if (container) {
        container.scrollBy({ left: ( container.clientWidth + 900 ) / 2, behavior: "smooth" });
    } else {
        console.error("Element with ID 'popular-movies' not found.");
    }
}

// Masquer les flèches si on ne peut plus scroller
function updateArrows() {
    let container = document.getElementById("popular-movies");
    let leftArrow = document.querySelector(".left");
    let rightArrow = document.querySelector(".right");

    if (container) {
        leftArrow.style.display = container.scrollLeft > 0 ? "block" : "none";
        rightArrow.style.display = container.scrollLeft < (container.scrollWidth - container.clientWidth) ? "block" : "none";
    }
}

// Vérifier les flèches après chaque scroll
document.getElementById("popular-movies").addEventListener("scroll", updateArrows);

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchRandomMovies();
    }
});

window.onload = () => {
    fetchPopularMovies();
    fetchRandomMovies();
};
