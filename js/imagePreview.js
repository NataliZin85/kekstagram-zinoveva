const form = document.querySelector('#upload-select-image');
const imageUploadPreview = form.querySelector('.img-upload__preview img');

const imgUploadScale = form.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const SCALE_CONTROL_VALUE_CHANGE = 25;
const MAX_CONTROL_VALUE = 100;
const MIN_CONTROL_VALUE = 25;
let CURRENT_SCALE_CONTROL_VALUE = 100;

// обработчик масштаба фотографии
scaleControlSmaller.onclick = function () {
  CURRENT_SCALE_CONTROL_VALUE = CURRENT_SCALE_CONTROL_VALUE - SCALE_CONTROL_VALUE_CHANGE;
  if (CURRENT_SCALE_CONTROL_VALUE >= MIN_CONTROL_VALUE && CURRENT_SCALE_CONTROL_VALUE <= MAX_CONTROL_VALUE) {
    scaleControlValue.value = `${ CURRENT_SCALE_CONTROL_VALUE }%`;
    imageUploadPreview.style.transform = `scale(${ CURRENT_SCALE_CONTROL_VALUE * 0.01 })`;
  }
};

scaleControlBigger.onclick = function () {
  CURRENT_SCALE_CONTROL_VALUE = CURRENT_SCALE_CONTROL_VALUE + SCALE_CONTROL_VALUE_CHANGE;
  if (CURRENT_SCALE_CONTROL_VALUE >= MIN_CONTROL_VALUE && CURRENT_SCALE_CONTROL_VALUE <= MAX_CONTROL_VALUE) {
    scaleControlValue.value = `${ CURRENT_SCALE_CONTROL_VALUE }%`;
    imageUploadPreview.style.transform = `scale(${ CURRENT_SCALE_CONTROL_VALUE * 0.01 })`;
  }
};

