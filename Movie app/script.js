const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f6623a5a4e696bc6c4435deec3dded06&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=f6623a5a4e696bc6c4435deec3dded06&query=";

var main = document.getElementById("main");
var search = document.getElementById("search");
var form = document.getElementById("form");


getMovies(APIURL);

async function getMovies(url) {
    var resp = await fetch(url);
    var respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    
    main.innerHTML = "";

    movies.forEach((movie) => {
        var { poster_path, title, vote_average, overview } = movie;

        var movieEl = document.createElement("div");
        movieEl.classList.add("movies");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate( vote_average )}">${vote_average}</span>
                    
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    var searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});