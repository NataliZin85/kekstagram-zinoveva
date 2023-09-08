import { openBigPicture } from './big-picture-modal.js';
import { isEnterKey } from './util.js';

const userPictures = document.querySelector('.pictures');

// находим template '#picture'
const templateMiniPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const miniPictureHandler = (evt,data) => {
  evt.preventDefault();
  openBigPicture(data);
};

// клонирование изображений по шаблону
const createMiniPicture = (data) => {
  const { url, description, likes, comments } = data;
  const miniPictureObject = templateMiniPicture.cloneNode(true);

  miniPictureObject.querySelector('.picture__img').src = url;
  miniPictureObject.querySelector('.picture__img').alt = description;
  miniPictureObject.querySelector('.picture__likes').textContent = likes;
  miniPictureObject.querySelector('.picture__comments').textContent = comments.length;

  miniPictureObject.addEventListener('click', (evt) => miniPictureHandler(evt, data));

  miniPictureObject.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openBigPicture(data);
    }
  });

  return miniPictureObject;
};

const resetMiniPictures = () => {
  userPictures.querySelectorAll('.picture').forEach((element) => element.remove());
};

// добавление клонированных изображений в контейнер ".pictures"
const renderMiniPictures = (pictures) => {
  resetMiniPictures();
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const miniPictureObject = createMiniPicture(picture);
    fragment.append(miniPictureObject);
  });

  userPictures.append(fragment);
};

export { renderMiniPictures };
