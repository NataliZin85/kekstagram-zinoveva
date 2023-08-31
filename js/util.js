const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const showAlertMessage = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.zIndex = '100';
  alertMessage.style.position = 'absolute';
  alertMessage.style.height = 'max-content';
  alertMessage.style.left = '0';
  alertMessage.style.right = '0';
  alertMessage.style.top = '40%';
  alertMessage.style.padding = '10px 3px';
  alertMessage.style.fontSize = '30px';
  alertMessage.style.textTransform = 'lowercase';
  alertMessage.style.textAlign = 'center';
  alertMessage.style.backgroundColor = 'rgb(255, 0, 0, 0.5)';

  alertMessage.textContent = message;
  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomArrayElement,
  getRandomInteger,
  isEscapeKey,
  isEnterKey,
  showAlertMessage,
  debounce
};
