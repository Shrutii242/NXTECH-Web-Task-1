
const audio = document.querySelector('.audi');
const slide = document.querySelector('#slide');
const current_time = document.querySelector('.current_time');
const songtime = document.querySelector('.songtime');
const songName = document.querySelector('.songname');
const artistName = document.querySelector('.artistname');
const forwardBtn = document.querySelector('.forward_btn');
const backwardBtn = document.querySelector('.backward_btn');
const playBtn = document.querySelector('.playbtn');
const image = document.querySelector('.img');

playBtn.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

const addmusic = (i) => {
    slide.value = 0;
    let song = songs[i];
    audio.src = song.path;

    songName.innerHTML = song.music_name;
    artistName.innerHTML = song.artist_name;
    image.style.backgroundImage = `url(${song.cover})`;

    audio.addEventListener('loadedmetadata', function() {
        songtime.innerHTML = format_timing(audio.duration);
        slide.max = audio.duration;
    });
};

addmusic(0);

const format_timing = (time) => {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
};

slide.addEventListener('input', function() {
    audio.currentTime = slide.value;
});

audio.addEventListener('timeupdate', function() {
    slide.value = audio.currentTime;
    current_time.innerHTML = format_timing(audio.currentTime);
});

forwardBtn.addEventListener('click', function() {
    const currentIndex = songs.findIndex(song => song.music_name === songName.innerHTML);
    const nextIndex = (currentIndex + 1) % songs.length;
    addmusic(nextIndex);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

backwardBtn.addEventListener('click', function() {
    const currentIndex = songs.findIndex(song => song.music_name === songName.innerHTML);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    addmusic(prevIndex);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});