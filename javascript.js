(function (global) {
  'use strict';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', "https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem");
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = function () {
      if (this.status === 200) { // the result is OK
        var response = JSON.parse(xhr.response);
        console.log('onload response', response);
        HandlerResponse(response);
      }
    };

    // send the request
    xhr.send();

    var boton = document.querySelector(".btn-play");
    var audio = document.getElementById("audio");
    var bar = document.querySelector(".seekbar progress");
    var chivato = 0;

    var HandlerResponse = function(response){
        var titulo = document.querySelector(".title");
        var responseTitulo = response.album.name;
        var autor = document.querySelector(".author");
        var responseAutor = response.artists[0].name;
        var img = document.querySelector(".cover").querySelector("img");
        img.src = response.album.images[0].url;
        titulo.textContent=responseTitulo;
        autor.textContent=responseAutor;
        audio.src = response.preview_url;
        bar.value = 0;
    };

    boton.addEventListener(
    'click', function () {
        if (chivato==0) {
            audio.play();
            boton.classList.add('playing');
            chivato = 1 ;
        }
        else {
            audio.pause();
            boton.classList.remove('playing');
            chivato = 0;
        }
    });

    audio.addEventListener('timeupdate', function() {
      //bar.setAttribute('max', audio.duration);
      bar.max = audio.duration;
      bar.value = audio.currentTime;
    });
  
})(window);