const apiKey = "c7b2ab55"; 
const searchButton = document.getElementById("searchButton");
const movieInput = document.getElementById("movieInput");
const movieDetails = document.getElementById("movieDetails");

searchButton.addEventListener("click", () => {
    const movieTitle = movieInput.value.trim();
    if (movieTitle) {
        fetchMovie(movieTitle);
    } else {
        alert("Please enter a movie title.");
    }
});

async function fetchMovie(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
        const data = await response.json();
        
        if (data.Response === "True") {
            displayMovie(data);
        } else {
            movieDetails.innerHTML = `<p>Movie not found. Try another title!</p>`;
        }
    } catch (error) {
        console.error("Error fetching movie:", error);
        movieDetails.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
}

function displayMovie(movie) {
    movieDetails.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <img class="movie-poster" src="${movie.Poster}" alt="Movie Poster">
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
    `;
}
