const songs = [
    {
        title: "i love u like an alcoholic",
        src: "https://files.catbox.moe/f9ymf9.mp3",
        cover: "https://files.catbox.moe/7pf69s.jpg"
    },
    {
        title: "deceptacon",
        src: "https://files.catbox.moe/8dlvet.mp3",
        cover: "https://files.catbox.moe/olynul.jpg"
    },
    {
        title: "just another day",
        src: "https://files.catbox.moe/3pko9g.mp3",
        cover: "https://files.catbox.moe/otfi3n.jpg"
    },
    // add more songs here
];

let songIndex = 0;
let typingTimer;

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume-control');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const albumCover = document.getElementById('album-cover');
const songTitle = document.getElementById('song-title');

function loadSong(song) {
    audio.src = song.src;
    albumCover.src = song.cover;
    typeTitle(song.title);
}

function playSong() {
    audio.play();
    playPauseBtn.textContent = '❚❚';
}

function pauseSong() {
    audio.pause();
    playPauseBtn.textContent = '▶';
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    if (durationMinutes && durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    switchSong(songs[songIndex]);
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    switchSong(songs[songIndex]);
}

function changeVolume(e) {
    audio.volume = e.target.value;
}

function switchSong(song) {
    fadeOutCover(() => {
        loadSong(song);
        playSong();
        fadeInCover();
    });
}

function fadeOutCover(callback) {
    albumCover.classList.add('fade-out');
    setTimeout(() => {
        callback();
        albumCover.classList.remove('fade-out');
    }, 500); // adjust duration of fade-out here
}

function fadeInCover() {
    albumCover.classList.add('fade-in');
    setTimeout(() => {
        albumCover.classList.remove('fade-in');
    }, 500); // Duration of the fade-in
}

function typeTitle(title) {
    clearTimeout(typingTimer);
    let i = 0;
    songTitle.textContent = '';

    function type() {
        if (i < title.length) {
            songTitle.textContent += title.charAt(i);
            i++;
            typingTimer = setTimeout(type, 50); // adjust typing speed here
        }
    }
    type();
}

playPauseBtn.addEventListener('click', () => {
    const isPlaying = playPauseBtn.textContent === '❚❚';
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeControl.addEventListener('input', changeVolume);
audio.addEventListener('ended', nextSong);

loadSong(songs[songIndex]);
