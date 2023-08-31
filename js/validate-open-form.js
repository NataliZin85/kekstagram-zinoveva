import { isEscapeKey, isEnterKey, showAlertMessage } from './util.js';
import { resetForm } from './validate-form.js';
import { resetScale } from './image-preview.js';
import { resetEffects } from './image-preview-effects.js';

const body = document.querySelector('body');
const form = document.querySelector('#upload-select-image');
const imgPreviewFormExit = form.querySelector('.img-upload__cancel');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUpload = document.querySelector('.img-upload__start input[type=file]');
const previewUploadImg = form.querySelector('.img-upload__preview img');
const effectsImgPreviews = form.querySelectorAll('.effects__preview');
const imgUploadTarget = form.querySelector('.img-upload__start');
const imgEffectLevel = form.querySelector('.img-upload__effect-level');
const imgUploadHashtag = imgUploadOverlay.querySelector('.text__hashtags');
const imgUploadComments = imgUploadOverlay.querySelector('.text__description');

// загрузка фотографий пользователя
// проверка файла
const validateFile = (file) => {
  const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
  const fileExtension = file.type.split('/')[1];
  const isValidFile = allowedExtensions.includes(fileExtension);
  if (!isValidFile) {
    showAlertMessage(`Подходящий формат файла: *.${ allowedExtensions.join(', *.')}`);
  }
  return isValidFile;
};

// при нажатии на загрузку
imgUpload.addEventListener('change', (evt) => {
  evt.preventDefault();

  const file = imgUpload.files;
  if (validateFile(file[0])) {
    openImgPreviewForm();
    previewUploadImg.src = URL.createObjectURL(file[0]);
    effectsImgPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${previewUploadImg.src}')`;
    });
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
    if (validateFile(files[0])) {
      openImgPreviewForm();
      imgUpload.files = files;
      previewUploadImg.src = URL.createObjectURL(files[0]);
      effectsImgPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url('${previewUploadImg.src}')`;
      });
    }
  } else {
    showAlertMessage('Допускается не более одного файла');
  }
});

// проверка на фокус на полях с хэштегами и комментарием
const isTextFieldFocus = () => {
  if (document.activeElement === imgUploadHashtag) {
    return true;
  }
  if (document.activeElement === imgUploadComments) {
    return true;
  }
};

// видимость ошибки
const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

// открытие и закрытие окна для редактирования фотографии
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocus() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeImgPreviewForm();
  }
};

// открытие формы предпросмотра фотографии
function openImgPreviewForm () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgEffectLevel.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

// закрытие формы предпросмотра фотографии
function closeImgPreviewForm () {
  resetForm();
  resetScale();
  resetEffects ();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// кнопка закрытия формы предпросмотра фотографии
imgPreviewFormExit.addEventListener('click', () => {
  closeImgPreviewForm();
});

imgPreviewFormExit.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImgPreviewForm();
  }
});

export { openImgPreviewForm, closeImgPreviewForm };
