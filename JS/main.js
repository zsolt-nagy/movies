import axios from 'axios';
import "../css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import 'bootstrap';
import '../index.html';
import '../movie.html';

//first search engine page code line 1-36
$(document).ready(() => {
    $('#searchForm').submit((e) => {
        e.preventDefault();
        let searchText = $('#searchText').val();
        getMovies(searchText);
    });

    if (document.location.pathname === "/movie.html") {
        getMovie();
    }
});

//Api for Search Engine Page code line 10-36
function getMovies(searchText) {
    var API_URL = `http://www.omdbapi.com/?s=${searchText}&apikey=387cdace`; // 'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace'
    axios.get(API_URL)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
            <div class="col-md-3">
            <div class="well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a data-imdbid="${movie.imdbID}" class="btn btn-primary js-details" href="#">Details</a>
            </div>
            </div>
            `;
            });

            $('#movies').html(output);

            $('.js-details').click((event) => {
                const id = $(event.target).data('imdbid');
                sessionStorage.setItem('movieId', id);
                window.location = 'movie.html';
                return false;
            });            
        })
        .catch((err) => {
            console.log(err);
        });
}


//Individual Movie Page API code line 45-87
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    var API_URL = `http://www.omdbapi.com/?i=${movieId}&apikey=387cdace`; //'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace';
    axios.get(API_URL)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
<div class="row">
<div class="col-md-4">
<img src="${movie.Poster}" class="thumbnail">
</div>
<div class="col-md-8">
<h2>${movie.Title}</h2>
<ul class="list-group">
<li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
<li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
<li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
<li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
<li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
<li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
<li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
</ul>

</div>
</div>
<div class="row">
<div class="well">
<h3>Plot</h3>
${movie.Plot}
<hr>
<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">IMDB Page</a>
<a href="index.html" class="btn btn-default">Back To Search</a>
</div>
</div>
`;

            $('#movie').html(output);
        }).catch((err) => {
            console.log(err);
        });
}
