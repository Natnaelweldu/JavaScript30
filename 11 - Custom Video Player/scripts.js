const video = document.querySelector("video.viewer");
const playerBtn = document.querySelector("button.player__button");
const inputs = document.querySelectorAll("input[type=range]");
const skipBtn = document.querySelectorAll("button[data-skip]");
const progressFilled = document.querySelector("div.progress__filled");
const progress = document.querySelector("div.progress");
const fullScreen = document.querySelector(".full-screen");

function togglePlay() {
  !video.paused ? video.pause() : video.play();
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
  video[this.name] = this.value;
}

function progressUpdate() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function progressScrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  mouseDown = false;
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playerBtn.textContent = icon;
}

function isFullscreen(element) {
  return document.fullscreenElement === element;
}

function screenResize() {
  isFullscreen(video) ? document.exitFullscreen() : video.requestFullscreen();
}

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", progressUpdate);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

playerBtn.addEventListener("click", togglePlay);
skipBtn.forEach((btn) => btn.addEventListener("click", skip));
inputs.forEach((input) => input.addEventListener("input", handleRange));
progress.addEventListener("click", progressScrub);

let mouseDown = false;
progress.addEventListener("mouseDown", () => (mouseDown = true));
progress.addEventListener("mouseMove", () => mouseDown && progressScrub(e));

fullScreen.addEventListener("click", screenResize);
