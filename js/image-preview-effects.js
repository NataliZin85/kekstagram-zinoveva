const DEFAULT_EFFECT_LEVEL_VALUE = 100;

const form = document.querySelector('#upload-select-image');
const imageUploadPreview = form.querySelector('.img-upload__preview img');
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

let effectName = '';
imgEffectLevelValue.value = DEFAULT_EFFECT_LEVEL_VALUE;

// функция учитывающая разность фильтров и их значений
const getFilterValue = () => {
  let effect = `${effectName}(${imgEffectLevelValue.value})`;
  switch (effectName) {
    case 'invert':
      effect = `${effectName}(${imgEffectLevelValue.value}%)`;
      break;
    case 'blur':
      effect = `${effectName}(${imgEffectLevelValue.value}px)`;
  }
  return effect;
};

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
imgEffectLevelSlider.noUiSlider.on('update', () => {
  imgEffectLevelValue.value = imgEffectLevelSlider.noUiSlider.get();
  imageUploadPreview.style.filter = getFilterValue(effectName);
});

// обнуление эффектов
const resetEffects = () => {
  imgEffectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1
  });
  imgEffectLevelSlider.noUiSlider.set(100);
  imgEffectLevelSlider.setAttribute('disabled', true);
  imageUploadPreview.style.filter = null;
};

// image effects
effectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectName = 'grayscale';
    imgEffectLevelSlider.removeAttribute('disabled', true);
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  }
});

effectSepia.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectName = 'sepia';
    imgEffectLevelSlider.removeAttribute('disabled', true);
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  }
});

effectMarvin.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectName = 'invert';
    imgEffectLevelSlider.removeAttribute('disabled', true);
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
  }
});

effectPhobos.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectName = 'blur';
    imgEffectLevelSlider.removeAttribute('disabled', true);
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
});

effectHeat.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectName = 'brightness';
    imgEffectLevelSlider.removeAttribute('disabled', true);
    imgEffectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
});

effectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectName = effectNone.id;
    resetEffects ();
  }
});

export { resetEffects };
