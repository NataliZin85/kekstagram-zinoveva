const form = document.querySelector('#upload-select-image');
const imageUploadPreview = form.querySelector('.img-upload__preview img');

const imgUploadScale = form.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

const SCALE_CONTROL_VALUE_CHANGE = 25;
const MAX_CONTROL_VALUE = 100;
const MIN_CONTROL_VALUE = 25;
const DEFAULT_CONTROL_VALUE = 100;

let currentScaleControlValue = DEFAULT_CONTROL_VALUE;

const updateScale = (value) => {
  currentScaleControlValue = value;
  scaleControlValue.value = `${ value }%`;
  imageUploadPreview.style.transform = `scale(${ value * 0.01 })`;
};

// обработчик масштаба фотографии
scaleControlSmaller.onclick = function () {
  const newCurrentScaleControlValue = currentScaleControlValue - SCALE_CONTROL_VALUE_CHANGE;
  if (newCurrentScaleControlValue >= MIN_CONTROL_VALUE && newCurrentScaleControlValue <= MAX_CONTROL_VALUE) {
    updateScale(newCurrentScaleControlValue);
  }
};

scaleControlBigger.onclick = function () {
  const newCurrentScaleControlValue = currentScaleControlValue + SCALE_CONTROL_VALUE_CHANGE;
  if (newCurrentScaleControlValue >= MIN_CONTROL_VALUE && newCurrentScaleControlValue <= MAX_CONTROL_VALUE) {
    updateScale(newCurrentScaleControlValue);
  }
};

const resetScale = () => {
  updateScale(DEFAULT_CONTROL_VALUE);
};

export { resetScale };
