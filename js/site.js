const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjI1OWYzZjY2NDA1NGZkZDZmZmNhOWI5YTdhYmI3NSIsInN1YiI6IjY0YzE2ODQ3MDk3YzQ5MDEwMGQxY2VlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lfJ8zPq8aTwkw09R6M7YtPCayyxeCcO_PMXwe-7lnik'
// https://api.themoviedb.org/3/movie/popular

async function getMovies() {
    try {
        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function displayMovies() {
    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById('movie-card-template');

    let data = await getMovies();
    let movies = data.results;

    movies.forEach(movie => {
        let movieCard = moviePosterTemplate.content.cloneNode(true);

        let titleElement = movieCard.querySelector('.card-body > h5');
        titleElement.textContent = movie.title;

        movieListDiv.appendChild(movieCard);
    });
}

