import {createObjects} from './data.js';

const userPictures = document.querySelector('.pictures');

// находим template '#picture'
const templateMiniPictures = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarObjects = createObjects();

const fragment = document.createDocumentFragment();

// клонирование изображений по шаблону
similarObjects.forEach(({url, description, likes, comments}) => {
  const pictureObject = templateMiniPictures.cloneNode(true);
  pictureObject.querySelector('.picture__img').src = url;
  pictureObject.querySelector('.picture__img').alt = description;
  pictureObject.querySelector('.picture__likes').textContent = likes;
  pictureObject.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(pictureObject);
});

userPictures.appendChild(fragment);
