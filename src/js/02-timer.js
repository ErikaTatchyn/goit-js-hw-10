import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selected = selectedDates[0];
    let now = new Date();
    if (selected < now) {
      window.alert('Please choose a date in the future');
      return;
    }
    document.querySelector('[data-start]').disabled = false;
  },
};

flatpickr('#datetime-picker', options);

let endDateInput = document.getElementById('datetime-picker');
let timer = document.querySelector('.timer');

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};

document.querySelector('[data-start]').addEventListener('click', () => {
  const countDownDate = new Date(endDateInput.value).getTime();
  let x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(x);
      timer.innerHTML = `Time's up!`;
      return;
    }

    const timeLeft = convertMs(distance);
    timer.innerHTML = `<div class="field">
      <span class="value" data-days>${timeLeft.days
        .toString()
        .padStart(2, '0')}</span>
      <span class="label">Days</span>
    </div>
    <div class="field">
      <span class="value" data-hours>${timeLeft.hours
        .toString()
        .padStart(2, '0')}</span>
      <span class="label">Hours</span>
    </div>
    <div class="field">
      <span class="value" data-minutes>${timeLeft.minutes
        .toString()
        .padStart(2, '0')}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="field">
    <span class="value" data-seconds>${timeLeft.seconds
      .toString()
      .padStart(2, '0')}</span>
    <span class="label">Seconds</span>
  </div>
</div>`;
  }, 1000);
});
