document.getElementById("search-button").addEventListener("click", () => {
    let searchQuery = document.getElementById("search-input").value;
    if (searchQuery.trim() === "") {
        alert("Veuillez entrer un titre de film !");
        return;
    }

    fetchMovies(searchQuery);
});

async function fetchMovies(query) {
    const API_KEY = "b99aaeba";
    const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            document.getElementById("results").innerHTML = `<p>Aucun film trouvé.</p>`;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
    }
}

function displayMovies(movies) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // efface les anciens résultats

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
