var searchBtn = document.querySelector('#artist-search-btn');

var artistName = new URL(location.href).searchParams.get('artist');
var artistThumbEl = document.querySelector('#artist-thumbnail');
var bioGenreEl = document.querySelector('#bio-genre');
var newsEl = document.querySelector('#news');
var artistSearchBtn = document.getElementById('artist-search-btn')
var favoritesBtn = document.getElementById("add-to-favorites")


function nyTimesApi() {
  var apiKey = 'Elez3rrH7G5nh44GoCJVBGcWaSKZnwYX'
  var requestUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${artistName}&sort=newest&api-key=${apiKey}`

  console.log(artistName, requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      newsEl.innerHTML = ""
      var betterData = data.response.docs
      for (let i = 0; i < 4; i++) {
        var formattedDate = betterData[i].pub_date.split("T")
        console.log(formattedDate)
        var article = document.createElement('div')
        var date = document.createElement('h4')
        date.textContent = formattedDate[0]
        article.appendChild(date)
        var link = document.createElement('a')
        link.setAttribute("href", betterData[i].web_url)
        var header = document.createElement('h3')
        header.textContent = (betterData[i].headline.main)
        link.appendChild(header)
        article.appendChild(link)
        var snippet = document.createElement('h5')
        snippet.textContent = (betterData[i].snippet)
        article.appendChild(snippet)

        newsEl.appendChild(article)
      }
    });
}
//Getting data from Audio DB
function audioDbApi() {
  var musicUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artistName}`;
  // var apiKey2 = '2';


  fetch(musicUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      bioGenreEl.innerHTML = ""
      artistThumbEl.innerHTML = ""

      var thumb = data.artists[0].strArtistThumb;
      var artist = data.artists[0].strArtist;
      var genre = data.artists[0].strGenre;
      var bio = data.artists[0].strBiographyEN;
      var topRadio = data.artists[0].strLastFMChart;

      var thumbEl = document.createElement('img');
      var artistEl = document.createElement('h2');
      var genreEl = document.createElement('p');
      var bioEl = document.createElement('p');
      var topRadioEl = document.createElement('a');

      thumbEl.src = thumb;
      artistEl.textContent = artist;
      genreEl.textContent = 'Genre: ' + genre;
      genreEl.className = 'fs-3'
      bioEl.textContent = bio;
      topRadioEl.textContent = 'Top Radio Plays';
      topRadioEl.href = topRadio;
      thumbEl.className = 'img-fluid';

      artistThumbEl.appendChild(thumbEl);
      artistThumbEl.appendChild(artistEl);
      bioGenreEl.appendChild(genreEl);
      bioGenreEl.appendChild(bioEl);
      bioGenreEl.appendChild(topRadioEl);

    });
}

function setFavoriteArtists() {
  var artistArray = JSON.parse(localStorage.getItem('artist')) || []
  var artistToSave = {'artistName': artistName, 'artistImg':artistThumbEl.firstChild.src};
  artistArray.push(artistToSave);
  var uniqueArtists = Array.from(new Set(artistArray));
  var data = JSON.stringify(uniqueArtists);
  localStorage.setItem('artist', data);
  validateFavorites();
};

var saveToLocalStorage = function (value) {
  var history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(value);
  var historySet = Array.from(new Set(history));
  var data = JSON.stringify(historySet);
  localStorage.setItem('history', data);
}

var redirectToArtistPage = function (artist) {
  window.location.assign(`./artist.html?artist=${artist}`);
}

var handleSearch = function (event) {
  event.preventDefault();
  var inputValue = document.querySelector('#search-input').value;
  saveToLocalStorage(inputValue);
  redirectToArtistPage(inputValue);
}

var validateFavorites = function () {
  var artistArray = JSON.parse(localStorage.getItem('artist')) || [];
  for(var i = 0; i < artistArray.length; i++) {
    if(artistArray[i].artistName.toLowerCase() === artistName.toLowerCase()) {
      favoritesBtn.classList.remove('btn-warning');
      favoritesBtn.classList.add('btn-success');
      favoritesBtn.textContent = 'Added to Favorites';
    }
  }
}

searchBtn.addEventListener('click', handleSearch);
favoritesBtn.addEventListener('click', setFavoriteArtists);
// validateFavorites();
nyTimesApi();
audioDbApi();