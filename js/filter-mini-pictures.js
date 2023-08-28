import { getRandomArrayElement } from './util.js';

const MAX_RANDOM_PICTURE_COUNT = 10;

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  MOST_DISCUSSED: 'filter-discussed',
};

let pictures = [];
let currentFilterId = FilterId.DEFAULT;

const filter = document.querySelector('.img-filters');
const filterForm = filter.querySelector('.img-filters__form');

const showFilter = () => {
  filter.classList.remove('img-filters--inactive');
};

// фильтры
const compareCommentsLength = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const filterRendomPictures = (uploadPictures) => {
  const randomPictures = [];
  while (randomPictures.length < MAX_RANDOM_PICTURE_COUNT) {
    const miniPicture = getRandomArrayElement(uploadPictures);
    if (!randomPictures.includes(miniPicture)) {
      randomPictures.push(miniPicture);
    }
  }
  return randomPictures;
};

// функция применения нужного фильтра к фотографиям
const getFilteredPictures = () => {
  if (currentFilterId === FilterId.RANDOM) {
    return filterRendomPictures(pictures);
  }
  if (currentFilterId === FilterId.MOST_DISCUSSED) {
    return [...pictures].sort(compareCommentsLength);
  }
  if (currentFilterId === FilterId.DEFAULT) {
    return [...pictures];
  }
};

// функция нажатия на кнопки с фильрами
const setOnClickFilters = (cb) => {
  filterForm.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilterId) {
      return;
    }

    filterForm
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilterId = clickedButton.id;
    cb(getFilteredPictures());
  });
};

// функция инициализации фильтров для загружаемых фотографий
const initUploadImgFilters = (uploadPictures, cb) => {
  showFilter();
  pictures = [...uploadPictures];
  setOnClickFilters(cb);
};


export { getFilteredPictures, initUploadImgFilters };
