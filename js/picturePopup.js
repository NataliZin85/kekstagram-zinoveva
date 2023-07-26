import { isEscapeKey, isEnterKey } from './util.js';
import { showBigPicture, renderBigComments } from './bigPicture.js';

const bigPicture = document.querySelector('.big-picture');
// const miniPicture = document.querySelectorAll('.picture');
const bigPictureExit = document.querySelector('#picture-cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


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
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

// miniPicture.addEventListener('keydown', (evt) => {
//   if (isEnterKey(evt)) {
//     openBigPicture();
//   }
// });

bigPictureExit.addEventListener('click', () => {
  closeBigPicture();
});

bigPictureExit.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

export { openBigPicture, closeBigPicture };
