(function (global) {
  'use strict';

    var boton = document.querySelector(".btn-play");
    var audio = document.getElementById("audio");
    var bar = document.querySelector(".seekbar progress");
    var formulario = document.querySelector("form");
    var playing = false;
    var song = false;

    var setTrack = function(queryURL, list) {
      /*
      Default queryURL
      if (queryURL == "") {
        queryURL = "0eGsygTp906u18L0Oimnem";
      }
      */

      var xhr = new XMLHttpRequest();
      //var baseURL = "https://api.spotify.com/v1/tracks/";
      xhr.open('GET', queryURL);
      xhr.setRequestHeader('Accept', 'application/json');

      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.response);
          if (list === 0) setInfoTrack(response);
          else if (response.tracks.items.length > 0) displayResults(response);
        };
      };

      xhr.send();
    };

    //setTrack("");

    var setInfoTrack = function(response){
        document.querySelector(".title").textContent = response.album.name;
        document.querySelector(".author").textContent = response.artists[0].name;
        document.querySelector(".cover").querySelector("img").src = response.album.images[1].url;
        audio.src = response.preview_url;
        boton.classList.remove('disabled');
        song = true;
        bar.value = 0;
    };


    /*
    var displayResults = function(response){
      var elem = document.getElementsByTagName('table')[0];
      if (elem){
        elem.parentNode.removeChild(elem);
      }
      var table = document.createElement('table');
      var row;
      var cell1;
      var cell2;
      var cell3;
      var img;
      var link;

      for (var i = 0; i < response.tracks.items.length; i++) {
        row = table.insertRow(i);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        link = document.createElement('a');
        link.href = response.tracks.items[i].href;
        link.className = "hidden";
        img = document.createElement('img');
        img.src = response.tracks.items[i].album.images[2].url; //urlIMG
        cell1.appendChild(img);
        cell1.appendChild(link);
        cell2.innerHTML = response.tracks.items[i].name;
        cell3.innerHTML = response.tracks.items[i].artists[0].name;  //ALL THE ARTISTS!
        };

      document.getElementsByClassName('table')[0].appendChild(table);
      document.getElementsByClassName('table')[0].className = "table";
      document.getElementsByTagName('tbody')[0].addEventListener('click', function(){
      var url = event.target.parentNode.firstChild.lastChild.href;
      setTrack(url,0);
      });
    };
    */

    var displayResults = function(response){
      var elem = document.getElementById("results");;
      /*
      if (elem){
        elem.removeChild(elem);
      }*/
      var li;
      var span;
      var img;
      var link;

      for (var i = 0; i < response.tracks.items.length; i++) {
        li = document.createElement('li');
        link = document.createElement('a');
        link.href = response.tracks.items[i].href;
        link.className = "hidden";
        li.appendChild(link);
        span = document.createElement('span');
        span.className = "artist";
        span.innerHTML = response.tracks.items[i].artists[0].name;
        link.appendChild(span);
        span = document.createElement('span');
        span.className = "song";
        span.innerHTML = response.tracks.items[i].name;
        link.appendChild(span);
        //img = document.createElement('img');
        //img.src = response.tracks.items[i].album.images[2].url; //urlIMG
        elem.appendChild(li);
      };
      /*document.getElementsByTagName('li')[0].addEventListener('click', function(){
      var url = event.target.parentNode.firstChild.lastChild.href;
      setTrack(url,0);
      });
      */
    };

    boton.addEventListener('click', function () {
      if (song){
        if (!playing) {
            audio.play();
            boton.classList.add('playing');
            playing = true ;
        }
        else {
            audio.pause();
            boton.classList.remove('playing');
            playing = false;
        }
      }
    });

    audio.addEventListener('timeupdate', function() {
      bar.max = audio.duration;
      bar.value = audio.currentTime;
      if (audio.currentTime == audio.duration){
        boton.classList.remove('playing');
        playing = false;
        bar.value = 0;
      }
    });

    //We can interact with the progress bar
    bar.addEventListener('click', function(evt) {
      if(playing) {
        audio.currentTime = (evt.layerX*audio.duration)/evt.target.clientWidth;
        bar.value = audio.currentTime;
      }
    });

    formulario.addEventListener('submit', searchTracks);

    function searchTracks(event){
      event.preventDefault();
      var name = formulario[0].value;
      if (!name){
        formulario[0].value = "Insert something in here!!";
        return;
      }
      var q = name.replace(" ", "%20");
      q = "https://api.spotify.com/v1/search?q=" + q + "&type=track&limit=10";
      setTrack(q,1);
      };

})(window);