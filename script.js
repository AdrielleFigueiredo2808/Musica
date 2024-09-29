const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Lista de músicas
const songs = [
  { title: 'Fica Tranquilo', src: 'music/fica-tranquilo.mp3', cover: 'images/images.png' },
  { title: 'Descansa', src: 'music/stellalaura-descansa.mp3', cover: 'images/images.png' },
  { title: 'Plano Perfeito', src: 'music/stellalaura-plano-perfeito.mp3', cover: 'images/images.png' },
  { title: 'Preciso Confiar', src: 'music/stellalaura-preciso-confiar.mp3', cover: 'images/images.png' }
];

let songIndex = 0;

// Carregar informações da música
function loadSong(song) {
  title.innerText = song.title;
  audio.src = song.src;
  cover.src = song.cover;
}

// Funções de reprodução e pausa
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

// Mudar para música anterior
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Mudar para próxima música
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Atualizar barra de progresso
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Configurar barra de progresso
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

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
audio.addEventListener('ended', nextSong);

// Carregar a primeira música no DOM
loadSong(songs[songIndex]);

