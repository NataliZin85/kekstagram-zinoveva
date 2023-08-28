const bigPicture = document.querySelector('.big-picture');

const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const showBigPicture = (data) => {
  const {url, description, likes } = data;

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
};

export { showBigPicture };
