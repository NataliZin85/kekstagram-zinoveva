import { isEscapeKey, isEnterKey } from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('#upload-select-image');
const imgUploadFormExit = form.querySelector('.img-upload__cancel');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const imgUpload = form.querySelector('.img-upload__input');
const imgUploadTarget = document.querySelector('.img-upload__start');

// загрузка фотографий пользователя
// проверка файла
const validateFile = (file) => {
  const allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
  const fileExtension = file.type.split('/')[1];
  const isValidFile = allowedExtension.includes(fileExtension);
  if (!isValidFile) {
    alert(`Allowed Extensions are : *.${ allowedExtension.join(', *.')}`);
  }
  return isValidFile;
};

// при нажатии на загрузку
imgUpload.addEventListener('change', (evt) => {
  evt.preventDefault();

  const files = imgUpload.files;
  for (let i = 0; i < files.length; i++) {
    console.log(`Filename: ${ files[i].name}`);
    console.log(`Type: ${ files[i].type}`);
    console.log(`Size: ${ files[i].size } bytes`);
    if (validateFile(files[i])) {
      openImgUploadForm();
    }
  }
});

// при перетаскивании файла с фотографией
imgUploadTarget.addEventListener('dragover', (evt) => {
  evt.preventDefault(); // отменяем действие по умолчанию
});
imgUploadTarget.addEventListener('drop', (evt) => {
  evt.preventDefault();

  const files = evt.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    console.log(`Filename: ${ files[i].name}`);
    console.log(`Type: ${ files[i].type}`);
    console.log(`Size: ${ files[i].size } bytes`);
    if (validateFile(files[i])) {
      openImgUploadForm();
    }
  }
});

// открытие и закрытие окна для редактирования фотографии
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadForm();
  }
};

function openImgUploadForm () {
  imgUploadForm.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUpload.addEventListener('keydown', onDocumentKeydown);
}

function closeImgUploadForm () {
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
