function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

let intervalId;

document.querySelector('[data-start]').onclick = function () {
  intervalId = setInterval(changeBackgroundColor, 1000);
  this.disabled = true;
};

document.querySelector('[data-stop]').onclick = function () {
  clearInterval(intervalId);
  document.querySelector('[data-start]').disabled = false;
};
