const API_KEY = "d48716f1";
const POPULAR_MOVIES = ["Batman", "Inception", "Interstellar", "Titanic", "Avatar", "Gladiator", "The Matrix"];
let allMovies = []; // stocke tous les films affichés

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
                allMovies.push(movie);
            });
        }
    }

    // affiche tous les films au chargement
    displayMovies(allMovies);
}

function displayMovies(movies) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    movies.forEach(movie => {
        let movieCard = `
            <div class="movie-card">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>Année : ${movie.Year}</p>
            </div>
        `;
        resultsDiv.innerHTML += movieCard;
    });
}

async function fetchMovies() {
    let searchQuery = document.getElementById("search-input").value.toLowerCase();

    if (searchQuery.trim() === "") {
        displayMovies(allMovies); // affiche les films populaires si rien n'est recherché
        return;
    }

    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
    const data = await response.json();

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        document.getElementById("results").innerHTML = "<p>Aucun film trouvé.</p>";
    }
}

window.onload = fetchPopularMovies;
