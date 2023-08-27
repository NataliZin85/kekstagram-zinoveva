import { isEscapeKey, isEnterKey } from './util.js';
import { resetForm } from './validateForm.js';
import { resetScale } from './imagePreview.js';
import { resetEffects } from './imagePreviewEffects.js';

const body = document.querySelector('body');
const form = document.querySelector('#upload-select-image');
const imgUploadFormExit = form.querySelector('.img-upload__cancel');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const imgUpload = form.querySelector('.img-upload__input');
const imgUploadTarget = document.querySelector('.img-upload__start');
const imgEffectLevelSlider = form.querySelector('.effect-level__slider');
const imgUploadHashtag = imgUploadForm.querySelector('.text__hashtags');
const imgUploadComments = imgUploadForm.querySelector('.text__comments');

// загрузка фотографий пользователя
// проверка файла
const validateFile = (file) => {
  const allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
  const fileExtension = file.type.split('/')[1];
  const isValidFile = allowedExtension.includes(fileExtension);
  if (!isValidFile) {
    alert(`Подходящий формат файла: *.${ allowedExtension.join(', *.')}`);
  }
  return isValidFile;
};

// при нажатии на загрузку
imgUpload.addEventListener('change', (evt) => {
  evt.preventDefault();

  const file = imgUpload.file;
  console.log(`Filename: ${ file[0].name}`);
  console.log(`Type: ${ file[0].type}`);
  console.log(`Size: ${ file[0].size } bytes`);
  if (validateFile(file[0])) {
    openImgUploadForm();
  }
});

// при перетаскивании файла с фотографией
imgUploadTarget.addEventListener('dragover', (evt) => {
  evt.preventDefault(); // отменяем действие по умолчанию
});
imgUploadTarget.addEventListener('drop', (evt) => {
  evt.preventDefault();

  const files = evt.dataTransfer.files;
  if (files.length === 1) {
    console.log(`Filename: ${ files[0].name}`);
    console.log(`Type: ${ files[0].type}`);
    console.log(`Size: ${ files[0].size } bytes`);
    if (validateFile(files[0])) {
      openImgUploadForm();
      imgUpload.files = files;
    }
  } else {
    alert('Допускается не более одного файла');
  }
});

const isTextFieldFocus = () =>
  document.activeElement === imgUploadHashtag ||
  document.activeElement === imgUploadComments;

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

// открытие и закрытие окна для редактирования фотографии
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocus() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeImgUploadForm();
  }
};

function openImgUploadForm () {
  imgUploadForm.classList.remove('hidden');
  body.classList.add('modal-open');
  imgEffectLevelSlider.setAttribute('disabled', true);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImgUploadForm () {
  resetForm();
  resetScale();
  resetEffects ();
  imgUploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadFormExit.addEventListener('click', () => {
  closeImgUploadForm();
});

imgUploadFormExit.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImgUploadForm();
  }
});

export { openImgUploadForm, closeImgUploadForm };
