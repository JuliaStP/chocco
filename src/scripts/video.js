const player = document.querySelector('.video__player');
const video = document.querySelector('.video__mp4');
const juice = document.querySelector('.video__playback-btn');
const playBtn = document.getElementById('play-pause');
const seekTooltip = document.getElementById('seek-tooltip');

const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');



function togglePlayPause() {
  if(video.paused) {
    playBtn.className = 'pause';
    video.play();
  }
  else {
    playBtn.className = 'play';
    video.pause();
  }
};

playBtn.onclick = function () {
  togglePlayPause();
};

player.addEventListener('click', togglePlayPause);

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return {
    hour: h,
    minutes: m,
    sec: s
  };
};

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  seek.setAttribute('max', videoDuration);
  progressBar.setAttribute('max', videoDuration);
  const time = formatTime(videoDuration);
  seekTooltip.innerText = `${time.minutes}:${time.sec}`;
  seekTooltip.setAttribute('datetime', `${time.minutes}m ${time.sec}s`)
};

document.addEventListener("DOMContentLoaded", initializeVideo);


function updateProgress() {
  seek.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
};

video.addEventListener('timeupdate', updateProgress);

function updateSeekTooltip(event) {
  const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
  seek.setAttribute('data-seek', skipTo);
  const t = formatTime(skipTo);
  seekTooltip.textContent = `${t.minutes}:${t.sec}`;
  const rect = video.getBoundingClientRect();
  seekTooltip.style.left = `${event.pageX - rect.left}px`;
};

seek.addEventListener('mousemove', updateSeekTooltip);

function skipAhead(event) {
  const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
};

seek.addEventListener('input', skipAhead);

const volumeButton = document.querySelector('.video__volume');
const volumeIcons = document.querySelectorAll('.video__volume-pic');
const volumeMute = document.querySelector('.volume-mute');
const volumeHigh = document.querySelector('.volume-unmute');
const volume = document.querySelector('.video__volume-scale');

function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
};

volume.addEventListener('input', updateVolume);

function updateVolumeIcon() {
  volumeIcons.forEach(icon => {
    icon.classList.add('hidden-pic');
  });

  volumeButton.setAttribute('data-title', 'Mute (m)')

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('hidden-pic');
    volumeButton.setAttribute('data-title', 'Unmute (m)')
  } else {
    volumeHigh.classList.remove('hidden-pic');
  }
};

video.addEventListener('volumechange', updateVolumeIcon);

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
};

volumeButton.addEventListener('click', toggleMute);