const cover = document.querySelector('#cover');
const track = document.querySelector('#track');
const surface = document.querySelector('#surface');

const trackTitle = document.querySelector('.track-title');
const trackArtist = document.querySelector('.track-artist');
const progressBar = document.getElementById('progress-bar');
const pPause = document.getElementById('play-pause');

trackIndex = 0;
tracks = ['./audio/spring-waltz.mp3', './audio/moonlight-sonata.mp3']; 
covers = ['./img/chopin.jpg', './img/beethoven.jpg'];
trackArtists = ['Chopin', 'Beethoven']; 
trackTitles = ["Spring Waltz", 'Moonlight Sonata']; 


// keyboard controls
document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        playPause();
    }
    else if (e.keyCode == 39) {
        nextSong();
    }
    else if (e.keyCode == 37) {
        previousSong();
    }
}

let playing = true;
function playPause() {
    if (playing) {
        const track = document.querySelector('#track');
        

        track.play();
        cover.classList.add('spinning');
        surface.classList.add('spinning');
        cover.classList.remove('paused');
        surface.classList.remove('paused');
        document.getElementById('play-pause-icon').className = 'fas fa-pause';
        playing = false;
    } else {
        
        track.pause();
        cover.classList.add('paused');
        surface.classList.add('paused');
        document.getElementById('play-pause-icon').className = 'fas fa-play';
        playing = true;
    }
}

track.addEventListener('ended', function(){
    nextSong();
});

function nextSong() {
    trackIndex++;
    if (trackIndex > 1) {
        trackIndex = 0;
    };
    track.src = tracks[trackIndex];
    cover.src = covers[trackIndex];

    trackArtist.innerHTML = trackArtists[trackIndex];
    trackTitle.innerHTML = trackTitles[trackIndex];

    playing = true;
    this.track.onloadedmetadata = function() {
      playPause();
    }
}

function previousSong() {
    trackIndex--;
    if (trackIndex < 1) {
        trackIndex = 0;
    };
    track.src = tracks[trackIndex];
    cover.src = covers[trackIndex];

    trackArtist.innerHTML = trackArtists[trackIndex];
    trackTitle.innerHTML = trackTitles[trackIndex];

    playing = false;
    playPause();
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

function updateProgressBar() {
    increment = 10 / track.duration;
    percent = Math.min(increment * track.currentTime * 10, 100);
    document.getElementById('progress-value').style.width = percent + '%';
    document.getElementById('current-time').innerHTML = (formatTime(Math.floor(track.currentTime)));
    if (document.getElementById('current-time').innerHTML === "NaN:NaN") {
        document.getElementById('current-time').innerHTML = "0:00";
    } else {
        document.getElementById('duration-time').innerHTML = (formatTime(Math.floor(track.duration)));
    }
  
  }
  
setInterval(updateProgressBar, 500);