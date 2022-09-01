
//Getting articles from NY Times API
var search = 'coldplay'
var apiKey= 'Elez3rrH7G5nh44GoCJVBGcWaSKZnwYX'
var requestUrl = `https:api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&sort=newest&api-key=${apiKey}`
var newsEl= document.querySelector('#news');
var artistThumbEl= document.querySelector('#artist-thumbnail');
var bioGenreEl = document.querySelector('#bio-genre');

fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var betterData = data.response.docs
      for(let i = 0; i < 4; i++){
        //<h2>Title</h2>
          //  <img src="https://via.placeholder.com/200" alt="image" />
            //<p class="text-center">Hello Here I am</p>
            // <p>Date: 2022-09-01</p>
        var formattedDate = betterData[i].pub_date.split("T")
        console.log(formattedDate)
        var article = document.createElement('div')
        var date = document.createElement('h4')
        date.textContent= formattedDate[0]
        article.appendChild(date)
        var link = document.createElement('a')
        link.setAttribute("href", betterData[i].web_url)
        var header = document.createElement('h3')
        header.textContent= (betterData[i].headline.main)
        link.appendChild(header)
        article.appendChild(link)
        var snippet = document.createElement('h5')
        snippet.textContent= (betterData[i].snippet)
        article.appendChild(snippet)

        newsEl.appendChild(article)
      }
    });

    //Getting data from Audio DB
    var artistName = 'outkast'
    var musicUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artistName}`
    var apiKey2 = '2'

    fetch(musicUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var thumb = data.artists[0].strArtistThumb;
      var artist = data.artists[0].strArtist;
      var genre = data.artists[0].strGenre;
      var bio = data.artists[0].strBiographyEN;
      var topRadio = data.artists[0].strLastFMChart;

    console.log(artist);  
      
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
     topRadioEl.textContent = 'Top Radio Plays'
     topRadioEl.href = topRadio;
     thumbEl.className = 'img-fluid'

     artistThumbEl.appendChild(thumbEl);
     artistThumbEl.appendChild(artistEl);
    bioGenreEl.appendChild(genreEl);
    bioGenreEl.appendChild(bioEl);
    bioGenreEl.appendChild(topRadioEl);
    


     

     
     


     
     console.log(topRadio);
    })
   
   
   