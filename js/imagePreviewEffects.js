const form = document.querySelector('#upload-select-image');
const imageUploadPreview = form.querySelector('.img-upload__preview');

const imgEffectLevel = form.querySelector('.effect-level');
const imgEffectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
const imgEffectLevelSlider = imgEffectLevel.querySelector('.effect-level__slider');

// image effects
const effectNone = form.querySelector('#effect-none');
const effectChrome = form.querySelector('#effect-chrome');
const effectSepia = form.querySelector('#effect-sepia');
const effectMarvin = form.querySelector('#effect-marvin');
const effectPhobos = form.querySelector('#effect-phobos');
const effectHeat = form.querySelector('#effect-heat');

imgEffectLevelValue.value = 100;

// создание слайдера
noUiSlider.create(imgEffectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

//обновление результата на слайдере
imgEffectLevelSlider.noUiSlider.on('update', (...rest) => {
  console.log(rest);
  imgEffectLevelValue.value = imgEffectLevelSlider.noUiSlider.get();
});

// image effects
effectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
    imageUploadPreview.style.filter = `grayscale(${imgEffectLevelValue.value})`;
  } else {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    imgEffectLevelSlider.noUiSlider.set(100);
    imageUploadPreview.style.filter = 'none';
  }
});

effectSepia.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
    imageUploadPreview.style.filter = `sepia(${imgEffectLevelValue.value})`;
  } else {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    imgEffectLevelSlider.noUiSlider.set(100);
    imageUploadPreview.style.filter = 'none';
  }
});

effectMarvin.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
    imageUploadPreview.style.filter = `invert(${imgEffectLevelValue.value }%)`;
  } else {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    imgEffectLevelSlider.noUiSlider.set(100);
    imageUploadPreview.style.filter = 'none';
  }
});

effectPhobos.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
    imageUploadPreview.style.filter = `blur(${imgEffectLevelValue.value }px)`;
  } else {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    imgEffectLevelSlider.noUiSlider.set(100);
    imageUploadPreview.style.filter = 'none';
  }
});

effectHeat.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
    imageUploadPreview.style.filter = `brightness(${imgEffectLevelValue.value})`;
  } else {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    imgEffectLevelSlider.noUiSlider.set(100);
    imageUploadPreview.style.filter = 'none';
  }
});

effectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    imgEffectLevelSlider.noUiSlider.set(100);
    // imgEffectLevelSlider.setAttribute('disabled', true);
    imageUploadPreview.style.filter = 'none';
  }
});
