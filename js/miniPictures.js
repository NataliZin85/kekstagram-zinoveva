import { openBigPicture } from './picturePopup.js';

const userPictures = document.querySelector('.pictures');

// находим template '#picture'
const templateMiniPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// клонирование изображений по шаблону
const createMiniPicture = (data) => {
  const { url, description, likes, comments } = data;
  const miniPictureObject = templateMiniPicture.cloneNode(true);

  miniPictureObject.querySelector('.picture__img').src = url;
  miniPictureObject.querySelector('.picture__img').alt = description;
  miniPictureObject.querySelector('.picture__likes').textContent = likes;
  miniPictureObject.querySelector('.picture__comments').textContent = comments.length;

  //miniPictureObject.addEventListener('click', () => openBigPicture(data));
  return miniPictureObject;
};

// добавление клонированных изображений в контейнер ".pictures"
const renderMiniPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const miniPictureObject = createMiniPicture(picture);
    miniPictureObject.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(picture);
    });

    fragment.append(miniPictureObject);
  });

  userPictures.append(fragment);
};

export { renderMiniPictures };
