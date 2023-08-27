import { openBigPicture } from './bigPictureModal.js';
import { isEnterKey } from './util.js';

const userPictures = document.querySelector('.pictures');

// находим template '#picture'
const templateMiniPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const handleMiniPictureClick = (evt,data) => {
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

  miniPictureObject.addEventListener('click', (evt) => handleMiniPictureClick(evt, data));

  miniPictureObject.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openBigPicture(data);
    }
  });

  return miniPictureObject;
};

// добавление клонированных изображений в контейнер ".pictures"
const renderMiniPictures = (pictures) => {
  userPictures.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const miniPictureObject = createMiniPicture(picture);
    fragment.append(miniPictureObject);
  });

  userPictures.append(fragment);
};

export { renderMiniPictures };
