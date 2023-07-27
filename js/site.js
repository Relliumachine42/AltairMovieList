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

window.onload = async function displayMovies() {
    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById('movie-card-template');
    let data = await getMovies();
    let movies = data.results;
    movies.forEach(movie => {
        let movieCard = moviePosterTemplate.content.cloneNode(true);
        let titleElement = movieCard.querySelector('.card-body > h5');
        titleElement.textContent = movie.title;
        let movieParagraphElement = movieCard.querySelector('.card-text');
        movieParagraphElement.textContent = movie.overview;
        let movieImgElement = movieCard.querySelector('.card-img-top');
        movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        let infoButton = movieCard.querySelector('button.btn');
        infoButton.setAttribute('data-movieId', movie.id);
        movieListDiv.appendChild(movieCard);
    });
}

async function showMovieDetails(btn) {
    let movieId = btn.getAttribute('data-movieId');

    let movieDeets = await getDetails(movieId);
    document.getElementById('widepic').setAttribute('src', `https://image.tmdb.org/t/p/w500${movieDeets.poster_path}`);
    document.getElementById('thinpic').setAttribute('src', `https://image.tmdb.org/t/p/w500${movieDeets.backdrop_path}`);
    document.querySelector('.modal-title').textContent = movieDeets.original_title;
    document.getElementById('date').textContent = movieDeets.release_date;
    document.getElementById('tag').textContent = movieDeets.tagline;
    document.getElementById('runtime').textContent = movieDeets.runtime;
    document.getElementById('movie-modal-p').textContent = movieDeets.overview;
    document.getElementById('genre').textContent = movieDeets.genres[0].name;



}

async function getDetails(movieId) {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
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