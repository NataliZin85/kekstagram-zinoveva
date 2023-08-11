const form = document.querySelector('#upload-select-image');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const imgUploadHashtag = imgUploadForm.querySelector('.text__hashtags');

const MAX_HASHTAGS_LENGTH = 5;

// валидация формы
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper'
});

// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэш-тега 20 символов, включая решётку;
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const validateRegex = (str) => hashtag.test(str);

// валидация самого хештега
const validateHashtag = (oneHashtag) => {
  if (oneHashtag) {
    const hashtagItems = oneHashtag.trim().split(' ');
    for (const hashtagItem of hashtagItems) {
      if (!validateRegex(hashtagItem)) {
        return false;
      }
    }
  }
  return true;
};

// один и тот же хэш-тег не может быть использован дважды;
const validateNoDuplicateHashtags = (hashtagsString) => {
  const hashtagItems = hashtagsString.trim().split(' ').map((item) => item.toLowerCase());
  const hashtagItemsSet = new Set(hashtagItems);
  return hashtagItems.length === hashtagItemsSet.size;
};

// нельзя указать больше пяти хэш-тегов в поле ввода;
const validateHashtagsItemsCount = (hashtagsString) => {
  const isLessThanMaxHT = hashtagsString.trim().split(' ').length <= MAX_HASHTAGS_LENGTH;
  if (!isLessThanMaxHT) {
    return false; // Ensure no more then 5 hashtags
  }
  return true;
};

// Сообщение об ошибки - хэш-тег;
const getHashtagErrorMessage = () => 'Invalid hashtag';

pristine.addValidator(imgUploadHashtag, validateNoDuplicateHashtags, 'Повторяющийся хэш-тег', 2 ,false);
pristine.addValidator(imgUploadHashtag, validateHashtag, getHashtagErrorMessage);
pristine.addValidator(imgUploadHashtag, validateHashtagsItemsCount , 'Не более 5-ти хеш-тегов', 2 ,false);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Форма валидна');
  } else {
    console.log('Форма невалидна');
  }
});
