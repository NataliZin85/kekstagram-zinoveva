const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const form = document.querySelector('#upload-select-image');
const imageUploadPreview = form.querySelector('.img-upload__preview img');
const imgEffectElement = form.querySelector('.effects');
const imgEffectLevel = form.querySelector('.img-upload__effect-level');
const imgEffectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
const imgEffectLevelSlider = imgEffectLevel.querySelector('.effect-level__slider');

let chosenEffect = Effect.DEFAULT;

const setImageStyle = () => {
  if (chosenEffect === Effect.DEFAULT) {
    imageUploadPreview.style.filter = null;
    return;
  }

  const { value } = imgEffectLevelValue;
  const { style, unit } = effectToFilter[chosenEffect];
  imageUploadPreview.style.filter = `${style}(${value}${unit})`;
};

//обновление результата на слайдере
const onSliderUpdate = () => {
  imgEffectLevelValue.value = imgEffectLevelSlider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(imgEffectLevelSlider, {
    range: { min, max },
    step,
    start: max,
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
  imgEffectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

const destroySlider = () => {
  if (imgEffectLevelSlider.noUiSlider) {
    imgEffectLevelSlider.noUiSlider.destroy();
  }
  setImageStyle();
};

const setSlider = () => {
  destroySlider();
  imgEffectLevel.classList.add('hidden');

  if (chosenEffect !== Effect.DEFAULT) {
    imgEffectLevel.classList.remove('hidden');
    createSlider(effectToSliderOptions[chosenEffect]);
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
};

const resetEffects = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

function initEffectsSlider() {
  setSlider();
  imgEffectElement.addEventListener('change', onEffectsChange);
}

export { initEffectsSlider, resetEffects };
