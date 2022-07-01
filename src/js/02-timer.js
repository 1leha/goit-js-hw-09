// Описан в документации
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const GREETING_MESSAGE1 =
  'Do you want to become younger? Fix the mistakes of the past? Or do you need to turn back time just for fun?.. ';
const GREETING_MESSAGE2 =
  'Ha! Everyone wants ... But this is just a countdown timer. It knows how to count time back and tell you about it.';
const BYE_MESSAGE = 'Good Bye! I will glad to see you next time!';
const DONE_MESSAGE = 'Sale has started!!! Hurry or be late!';

//! Тут сокрыта и закомменчена надоедалка Notiflix
// Notiflix.Confirm.show(
//   'Super-Duper countdown timer',
//   GREETING_MESSAGE1,
//   'Yes',
//   'No',
//   function okCb() {
//     Notiflix.Report.warning(
//       'Super-Duper countdown timer',
//       GREETING_MESSAGE2,
//       'Let`s Go!'
//     );
//   },
//   function cancelCb() {
//     Notiflix.Report.info('Super-Duper countdown timer', BYE_MESSAGE, 'Bye!');
//     return;
//   },
//   {
//     width: '320px',
//     borderRadius: '8px',
//   }
// );

refs.btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const curentDate = Date.now();
    const deltaTime = selectedDates[0].getTime() - curentDate;
    const isPastDate = deltaTime < 0;

    if (isPastDate) {
      refs.btnStart.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future!');
      return;
    }
    refs.btnStart.removeAttribute('disabled', '');
  },
};

flatpickr('#datetime-picker', options);

class CountDownTimer {
  constructor({ selectedDate, updateUI, inputs, alerts }) {
    this.intervalId = null;
    this.isActive = false;
    this.isFinished = false;
    this.selectedDate = selectedDate;

    this.updateUI = updateUI;
    this.inputs = inputs;
    this.alerts = alerts;
  }

  runTimer() {
    if (this.isActive) {
      return;
    }

    this.intervalId = setInterval(() => {
      const selectedMs = new Date(this.selectedDate).getTime();
      const curentMs = Date.now();

      const deltaMs = selectedMs - curentMs;
      const time = this.convertMs(deltaMs);

      this.inputs.button.setAttribute('disabled', '');
      this.inputs.input.setAttribute('disabled', '');

      this.isActive = true;

      this.isFinished = deltaMs <= 0;

      if (this.isFinished) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isActive = false;
        this.inputs.input.removeAttribute('disabled', '');

        this.alerts();

        return;
      }

      this.updateUI(time);
    }, 1000);
  }

  pad(num) {
    return String(num).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const countdownTimer = new CountDownTimer({
  selectedDate: 0,
  updateUI: updateTimerUI,
  inputs: controlElemrnts(refs.input, refs.btnStart),
  alerts: alerts,
});

refs.input.addEventListener('input', e => {
  countdownTimer.selectedDate = e.target.value;
});

refs.btnStart.addEventListener(
  'click',
  countdownTimer.runTimer.bind(countdownTimer)
);

function updateTimerUI({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function controlElemrnts(input, button) {
  return { input, button };
}

function alerts() {
  Notiflix.Report.success('Super-Duper countdown timer', DONE_MESSAGE, 'Done!');
}

//! первоначальный объект для тренировки
// const timer = {
//   intervalId: null,

//   runTimer() {
//     if (this.intervalId) {
//       refs.btnStart.setAttribute('disabled', '');
//       refs.input.setAttribute('disabled', '');

//       return;
//     }

//     // console.log(`Отсчест пошел`, convertMs(selectedMs - curentMs));
//     this.intervalId = setInterval(this.redusTime.bind(this), 1000);
//     // console.log('runTimer', this.intervalId);
//   },

//   redusTime() {
//     const selectedMs = new Date(refs.input.value).getTime();
//     const curentMs = Date.now();
//     const deltaMs = selectedMs - curentMs;
//     const { days, hours, minutes, seconds } = convertMs(deltaMs);
//     refs.btnStart.setAttribute('disabled', '');
//     refs.input.setAttribute('disabled', '');

//     if (deltaMs <= 0) {
//       //   console.log('stop');
//       clearInterval(this.intervalId);
//       this.intervalId = null;
//       refs.input.removeAttribute('disabled', '');

//       Notiflix.Report.success(
//         'Super-Duper countdown timer',
//         DONE_MESSAGE,
//         'Done!'
//       );

//       return;
//     }

//     updateTimerUI({ days, hours, minutes, seconds });
//   },
// };

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = pad(Math.floor(ms / day));
//   // Remaining hours
//   const hours = pad(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = pad(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

// function pad(num) {
//   return String(num).padStart(2, '0');
// }
