import { getRandomArrayElement } from './util.js';

const filter = document.querySelector('.img-filters');
const filterForm = filter.querySelector('.img-filters__form');

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  MOST_DISCUSSED: 'filter-discussed',
};

const MAX_RANDOM_PICTURE_COUNT = 10;
let pictures = [];
let currentFilterId = FilterId.DEFAULT;

const showFilter = () => {
  filter.classList.remove('img-filters--inactive');
};

const compareCommentsLength = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const selectRendomPictures = (a) => {
  const randomPictures = [];
  while (randomPictures.length < MAX_RANDOM_PICTURE_COUNT) {
    const miniPicture = getRandomArrayElement(a);
    if (!randomPictures.includes(miniPicture)) {
      randomPictures.push(miniPicture);
    }
  }
  return randomPictures;
};

const getFilteredPictures = () => {
  if (currentFilterId === FilterId.RANDOM) {
    return selectRendomPictures(pictures);
  }
  if (currentFilterId === FilterId.MOST_DISCUSSED) {
    return [...pictures].sort(compareCommentsLength);
  }
  if (currentFilterId === FilterId.DEFAULT) {
    return [...pictures];
  }
};

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

const init = (uploadPictures, cb) => {
  showFilter();
  pictures = [...uploadPictures];
  setOnClickFilters(cb);
};


export { getFilteredPictures, init };
