function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const delay = e.target.elements.delay.value;
  const step = e.target.elements.step.value;
  const amount = e.target.elements.amount.value;
  for (let position = 0; position < amount; i++) {
    const promiseDelay = Number(delay) + Number(step) * i;
    createPromise(i, promiseDelay)
      .then(res => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(error => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
