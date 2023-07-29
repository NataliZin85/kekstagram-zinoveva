import { isEscapeKey, isEnterKey } from './util.js';
import { showBigPicture } from './bigPicture.js';
import { renderBigComments } from './bigPictureComments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureExit = document.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (data) {
  showBigPicture(data);
  renderBigComments(data.comments);
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureExit.addEventListener('click', () => {
  closeBigPicture();
});

bigPictureExit.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

export { openBigPicture, closeBigPicture };
