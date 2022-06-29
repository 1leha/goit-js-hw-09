import flatpickr from 'flatpickr';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let intervalId;

refs.btnStop.setAttribute('disabled', '');

refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);

function onStart() {
  refs.btnStart.setAttribute('disabled', '');
  refs.btnStop.removeAttribute('disabled', '');

  intervalId = setInterval(changeColor, 1000);
}

function onStop() {
  refs.btnStop.setAttribute('disabled', '');
  refs.btnStart.removeAttribute('disabled', '');

  clearInterval(intervalId);
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
