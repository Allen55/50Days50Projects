const API_URL_MAIN =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a84d48fb8e622877bfcb153493418741&page=1';
const API_URL_DRAMA =
  'https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=a84d48fb8e622877bfcb153493418741';
const API_URL_IN_THEATERS =
  'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=a84d48fb8e622877bfcb153493418741';
const API_URL_KIDS =
  'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=a84d48fb8e622877bfcb153493418741';
const API_URL_RATED_R =
  'https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=a84d48fb8e622877bfcb153493418741';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=a84d48fb8e622877bfcb153493418741&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const navDrama = document.getElementById('dramas');
const inTheaters = document.getElementById('in-theaters');
const kids = document.getElementById('kids');
const ratedR = document.getElementById('rated-r');

//Get initial movies

getMovies(API_URL_MAIN);

//NAV ITEMS
navDrama.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_URL_DRAMA);
});

inTheaters.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_URL_IN_THEATERS);
});

kids.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_URL_KIDS);
});
ratedR.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_URL_RATED_R);
});

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>`;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'yellow';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
