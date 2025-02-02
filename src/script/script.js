const API_KEY = "d48716f1";
const POPULAR_MOVIES = ["Jurassic World", "Black Panther", "Fast & Furious 7", "Titanic", "Avatar", "Dune", "The Matrix"];
const RANDOM_KEYWORDS = ["space", "war", "family", "future", "magic", "adventure", "hero", "spy"];
let page = 1;  // Pagination pour charger plus de films
let isLoading = false;  // Évite les chargements multiples

async function fetchPopularMovies() {
    let popularContainer = document.getElementById("popular-movies");
    popularContainer.innerHTML = "";

    for (let title of POPULAR_MOVIES) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
        const data = await response.json();
        
        if (data.Response === "True") {
            for (const movie of data.Search) {
                if (movie.Poster !== "N/A") {  // Vérifie si le film a une image
                    const movieDetailsResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
                    const movieDetails = await movieDetailsResponse.json();

                    let movieCard = `
                        <div class="movie-card">
                            <img src="${movie.Poster}" alt="${movie.Title}">
                            <h3>${movie.Title}</h3>
                            <p>Année : ${movie.Year}</p>
                            <p>Note IMDb : ${movieDetails.imdbRating}</p>
                        </div>
                    `;
                    popularContainer.innerHTML += movieCard;
                }
            }
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
        for (const movie of data.Search) {
            if (movie.Poster !== "N/A") {  // Vérifie si le film a une image
                const movieDetailsResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
                const movieDetails = await movieDetailsResponse.json();

                let movieCard = `
                    <div class="movie-card">
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                        <p>Année : ${movie.Year}</p>
                        <p>Note IMDb : ${movieDetails.imdbRating}</p>
                    </div>
                `;
                allMoviesContainer.innerHTML += movieCard;
            }
        }
    }

    document.getElementById("loader").classList.add("hidden");
    isLoading = false;
}

document.addEventListener("DOMContentLoaded", function() {
    let leftArrow = document.querySelector(".left");
    let rightArrow = document.querySelector(".right");
    let carousel = document.querySelector(".carousel");

    if (leftArrow) {
        leftArrow.addEventListener("click", scrollLeft);
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", scrollRight);
    }

    let searchButton = document.getElementById("search-button");
    if (searchButton) {
        searchButton.addEventListener("click", fetchMovies);
    }

    // Check the scroll position initially
    checkScrollPosition();

    // Add event listener to check scroll position after each scroll
    carousel.addEventListener("scroll", checkScrollPosition);
});

async function fetchMovies() {
    let searchQuery = document.getElementById("search-input").value.toLowerCase();

    // Cacher la section des films les plus recherchés
    let popularSection = document.querySelector(".carousel");
    let popularTitle = document.querySelector("h2");
    popularSection.style.display = "none";
    popularTitle.style.display = "none";

    if (searchQuery.trim() === "") {
        document.getElementById("all-movies").innerHTML = ""; // Efface les films actuels
        page = 1;  // Réinitialise la pagination
        fetchPopularMovies();  // Recharge les films populaires
        fetchRandomMovies();  // Recharge des films aléatoires
        popularSection.style.display = "flex";
        popularTitle.style.display = "block";
        return;
    }

    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${page}`);
    const data = await response.json();

    if (data.Response === "True") {
        let allMoviesContainer = document.getElementById("all-movies");
        allMoviesContainer.innerHTML = ""; // Efface les films actuels

        for (const movie of data.Search) {
            if (movie.Poster !== "N/A") {  // Vérifie si le film a une image
                const movieDetailsResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
                const movieDetails = await movieDetailsResponse.json();

                let movieCard = `
                    <div class="movie-card">
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                        <p>Année : ${movie.Year}</p>
                        <p>Note IMDb : ${movieDetails.imdbRating}</p>
                    </div>
                `;
                allMoviesContainer.innerHTML += movieCard;
            }
        }
    }
}

// Ajoutez cet événement pour déclencher la recherche
document.getElementById("search-input").addEventListener("input", fetchMovies);

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
        rightArrow.style.display = container.scrollLeft < (container.scrollWidth - container.clientWidth)-350 ? "block" : "none";
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
