const form = document.querySelector('#upload-select-image');
const imageUploadPreview = form.querySelector('.img-upload__preview img');

const imgUploadScale = form.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

const SCALE_CONTROL_VALUE_CHANGE = 25;
const MAX_CONTROL_VALUE = 100;
const MIN_CONTROL_VALUE = 25;

let currentScaleControlValue = 100;

// обработчик масштаба фотографии
scaleControlSmaller.onclick = function () {
  const newCurrentScaleControlValue = currentScaleControlValue - SCALE_CONTROL_VALUE_CHANGE;
  if (newCurrentScaleControlValue >= MIN_CONTROL_VALUE && newCurrentScaleControlValue <= MAX_CONTROL_VALUE) {
    currentScaleControlValue = newCurrentScaleControlValue;
    scaleControlValue.value = `${ currentScaleControlValue }%`;
    imageUploadPreview.style.transform = `scale(${ currentScaleControlValue * 0.01 })`;
  }
};

scaleControlBigger.onclick = function () {
  const newCurrentScaleControlValue = currentScaleControlValue + SCALE_CONTROL_VALUE_CHANGE;
  if (newCurrentScaleControlValue >= MIN_CONTROL_VALUE && newCurrentScaleControlValue <= MAX_CONTROL_VALUE) {
    currentScaleControlValue = newCurrentScaleControlValue;
    scaleControlValue.value = `${ currentScaleControlValue }%`;
    imageUploadPreview.style.transform = `scale(${ currentScaleControlValue * 0.01 })`;
  }
};

