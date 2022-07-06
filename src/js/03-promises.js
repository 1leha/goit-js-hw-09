import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let delayNumbered = Number(delay.value);
  let stepNumbered = Number(step.value);
  const amountNumbered = Number(amount.value);

  for (let i = 0; i < amountNumbered; i += 1) {
    delayNumbered += stepNumbered;

    createPromise(i, delayNumbered).then(onSuccess).catch(onError);
  }

  e.currentTarget.reset();
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
