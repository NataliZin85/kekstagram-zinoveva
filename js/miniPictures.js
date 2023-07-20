const userPictures = document.querySelector('.pictures');

// находим template '#picture'
const templateMiniPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// клонирование изображений по шаблону
const createMiniPicture = ({url, description, likes, comments}) => {
  const pictureObject = templateMiniPicture.cloneNode(true);

  pictureObject.querySelector('.picture__img').src = url;
  pictureObject.querySelector('.picture__img').alt = description;
  pictureObject.querySelector('.picture__likes').textContent = likes;
  pictureObject.querySelector('.picture__comments').textContent = comments.length;

  return pictureObject;
};

// добавление клонированных изображений в контейнер ".pictures"
const renderMiniPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureObject = createMiniPicture(picture);
    fragment.append(pictureObject);
  });

  userPictures.append(fragment);
};

export { renderMiniPictures };
