var searchBtn = document.querySelector('#search');
var storedFavorites = document.querySelector('#favoriteArtists');


fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=outkast')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var popularSearchesEl = document.querySelector('#popular-searches');
        var thumb = data.artists[0].strArtistThumb;
        var artist = data.artists[0].strArtist;

        var aEl = document.createElement('a');
        var outkastImageEl = document.createElement('img');
        var outkastTitleEl = document.createElement('p');
        var outkastDivEl = document.createElement('div');

        outkastImageEl.src = thumb;
        outkastImageEl.className = 'img-fluid';
        outkastTitleEl.textContent = artist;
        outkastTitleEl.className = 'fs-3 text-center';


        aEl.href = `./artist.html?artist=${artist}`;
        aEl.className = 'col-sm-12 col-md-12 col-lg-4';

        outkastDivEl.appendChild(outkastImageEl);
        outkastDivEl.appendChild(outkastTitleEl);
        aEl.appendChild(outkastDivEl);
        popularSearchesEl.appendChild(aEl);

    });




fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var popularSearchesEl = document.querySelector('#popular-searches');
        var thumb = data.artists[0].strArtistThumb;
        var artist = data.artists[0].strArtist;

        var aEl = document.createElement('a');
        var coldplayImageEl = document.createElement('img');
        var coldplayTitleEl = document.createElement('p');
        var coldplayDivEl = document.createElement('div')

        coldplayImageEl.src = thumb;
        coldplayImageEl.className = 'img-fluid';
        coldplayTitleEl.textContent = artist;
        coldplayTitleEl.className = 'fs-3 text-center';
        
        aEl.className = 'col-sm-12 col-md-12 col-lg-4'
        aEl.href = `./artist.html?artist=${artist}`;

        coldplayDivEl.appendChild(coldplayImageEl);
        coldplayDivEl.appendChild(coldplayTitleEl);
        aEl.appendChild(coldplayDivEl);
        popularSearchesEl.appendChild(aEl);

    });

fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=Rihanna')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var popularSearchesEl = document.querySelector('#popular-searches');
        var thumb = data.artists[0].strArtistThumb;
        var artist = data.artists[0].strArtist;

        var aEl = document.createElement('a');
        var RihannaImageEl = document.createElement('img');
        var RihannaTitleEl = document.createElement('p');
        var RihannaDivEl = document.createElement('div')

        RihannaImageEl.src = thumb;
        RihannaImageEl.className = 'img-fluid';
        RihannaTitleEl.textContent = artist;
        RihannaTitleEl.className = 'fs-3 text-center';
        
        aEl.className = 'col-sm-12 col-md-12 col-lg-4'
        aEl.href = `./artist.html?artist=${artist}`;

        RihannaDivEl.appendChild(RihannaImageEl);
        RihannaDivEl.appendChild(RihannaTitleEl);
        aEl.appendChild(RihannaDivEl);
        popularSearchesEl.appendChild(aEl);
    });

var saveToLocalStorage = function (value) {
    var history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(value);
    var data = JSON.stringify(history);
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


var fillFavorites = function() {
    var artistArray = JSON.parse(localStorage.getItem('artist')) || [];
    var uniqueArtists= Array.from(new Set(artistArray));
    for(var i = 0; i < uniqueArtists.length; i++) {
        var favLinkEl = document.createElement('a');
        var favImageEl = document.createElement('img');
        var favTitleEl = document.createElement('p');
        var favDivEl = document.createElement('div')
        
        favImageEl.src = artistArray[i].artistImg;
        favImageEl.className = 'img-fluid';
        favTitleEl.textContent = artistArray[i].artistName;
        favTitleEl.className = 'fs-3 text-center';
        
        favLinkEl.className = 'col-sm-12 col-md-12 col-lg-4'
        favLinkEl.href = `./artist.html?artist=${artistArray[i].artistName}`;
        
        favDivEl.appendChild(favImageEl);
        favDivEl.appendChild(favTitleEl);
        favLinkEl.appendChild(favDivEl);
        storedFavorites.appendChild(favLinkEl);
    }
}

searchBtn.addEventListener('click', handleSearch);
fillFavorites();
