function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
console.log(first);
const stopBtn = document.querySelector('[data-stop]');
const startBtn = document.querySelector('[data-start]');
let intervalId;

stopBtn.disabled = true;

startBtn.onclick = function () {
  intervalId = setInterval(changeBackgroundColor, 1000);
  this.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = function () {
  clearInterval(intervalId);
  this.disabled = true;
  startBtn.disabled = false;
};
