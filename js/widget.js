(function (global) {
  'use strict';

    var boton = document.querySelector(".btn-play");
    var audio = document.getElementById("audio");
    var bar = document.querySelector(".seekbar progress");
    var formulario = document.querySelector("form");
    var playing = false;
    var song = false;

    var setTrack = function(track) {
      //Default track
      if (track == "") {
        track = "0eGsygTp906u18L0Oimnem";
      }

      var xhr = new XMLHttpRequest();
      var baseURL = "https://api.spotify.com/v1/tracks/";
      xhr.open('GET', baseURL + track);

      xhr.setRequestHeader('Accept', 'application/json');

      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.response);
          setInfoTrack(response);
        };
      };

      xhr.send();
    };

    setTrack("");

    var setInfoTrack = function(response){
        document.querySelector(".title").textContent = response.album.name;
        document.querySelector(".author").textContent = response.artists[0].name;
        document.querySelector(".cover").querySelector("img").src = response.album.images[1].url;
        audio.src = response.preview_url;
        boton.classList.remove('disabled');
        song = true;
        bar.value = 0;
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

    formulario.addEventListener('submit', function(evt) {
      evt.preventDefault();
      var track = formulario[0].value.split(':')[2];
      console.log(track);
      boton.classList.remove('playing');
      playing = false;
      setTrack(track);
    });

    //We can interact with the progress bar
    bar.addEventListener('click', function(evt) {
      if(playing) {
        audio.currentTime = (evt.layerX*audio.duration)/200;
        bar.value = audio.currentTime;
        console.log(document.querySelector(".seekbar progress").style.width);
      }
    });

})(window);

// fly me to the moon
// encodeURIComponent(parametroDeBusqueda)
// https://api.spotify.com/v1/search?q={{ PARAMETRO DE BUSQUEDA }}&type=track