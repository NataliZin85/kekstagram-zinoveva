import { isEscapeKey, isEnterKey } from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('#upload-select-image');
const imgUploadFormExit = form.querySelector('.img-upload__cancel');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const imgUpload = form.querySelector('.img-upload__input');
const imgUploadTarget = document.querySelector('.img-upload__start');
const imgUploadHashtag = imgUploadForm.querySelector('.text__hashtags');
const imgUploadDescription = imgUploadForm.querySelector('.text__description');

const MAX_HASHTAGS_LENGTH = 5;

// загрузка фотографий пользователя
// проверка файла
const validateFile = (file) => {
  const allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
  const fileExtension = file.type.split('/')[1];
  const isValidFile = allowedExtension.includes(fileExtension);
  return isValidFile ? isValidFile : alert(`Allowed Extensions are : *.${ allowedExtension.join(', *.')}`);
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
}, false);

// при перетаскивании файла с фотографией
imgUploadTarget.addEventListener('dragover', (evt) => {
  evt.preventDefault(); // отменяем действие по умолчанию
}, false);
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
}, false);

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

// валидация
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper'
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const validateRegex = (str) => hashtag.test(str);

// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэш-тега 20 символов, включая решётку;
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
const validateHashtag = (hashtagString) => {
  if (hashtagString) {
    const hashtagItems = hashtagString.trim().split(' ');
    for (const hashtagItem of hashtagItems) {
      if (!validateRegex(hashtagItem)) {
        return false; // Hash tags are invalid
      }
    }
  }

  return true; //Hash tags are valid
};

// один и тот же хэш-тег не может быть использован дважды;
const validateNoDuplicateHashtags = (hashtagString) => {
  const hashtagItems = hashtagString.trim().split(' ').map((item) => item.toLowerCase());
  const hashtagItemsSet = new Set(hashtagItems);
  return hashtagItems.length === hashtagItemsSet.size;
};

// нельзя указать больше пяти хэш-тегов;
const validateHashtagsItemsCount = (hashtagString) => {
  const isLessThanMaxHT = hashtagString.trim().split(' ').length <= MAX_HASHTAGS_LENGTH;
  if (!isLessThanMaxHT) {
    return false; // Ensure no more then 5 hashtags
  }
  return true;
};

// Сообщение об ошибки - хэш-тег;
const getHashtagErrorMessage = () => 'Invalid hashtag.';

// длина комментария не может составлять больше 140 символов;
const validateDescription = (value) => value.length === 0 || value.length <= 140;

pristine.addValidator(imgUploadDescription, validateDescription, 'От 2 до 140 символов');
pristine.addValidator(imgUploadHashtag, validateNoDuplicateHashtags, 'Ensure no duplicate hashtags', 2 ,false);
pristine.addValidator(imgUploadHashtag, validateHashtag, getHashtagErrorMessage);
pristine.addValidator(imgUploadHashtag, validateHashtagsItemsCount , 'Ensure no more then 5 hashtags', 2 ,false);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Форма валидна');
  } else {
    console.log('Форма невалидна');
  }
});

export { openImgUploadForm, closeImgUploadForm };
