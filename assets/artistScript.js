
//Getting articles from NY Times API
var search = 'coldplay'
var apiKey= 'Elez3rrH7G5nh44GoCJVBGcWaSKZnwYX'
var requestUrl = `https:api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&sort=newest&api-key=${apiKey}`
var newsEl= document.querySelector('#news');
fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var betterData = data.response.docs
      for(let i = 0; i < 5; i++){
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
      
      thumb = document.createElement('figure');
      artist = document.createElement('fig caption');
      genre = document.createElement('p');
      bio = document.createElement('p');
      topRadio = document.createElement('a');

      


      
      console.log(topRadio);
    })
   
   
   