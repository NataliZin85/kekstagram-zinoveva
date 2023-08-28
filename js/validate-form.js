const MAX_HASHTAGS_LENGTH = 5;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликую...'
};

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAGS_LENGTH} хэштегов`,
  NOT_UNIQUE: 'Повторяющийся хэштег. Хэштеги должны быть уникальными',
  INVALID_HASHTAG: 'Неправильный хэштег. Хэштег должен начинаться с символа "#" и состоять из букв и чисел',
};

const form = document.querySelector('#upload-select-image');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadHashtag = imgUploadOverlay.querySelector('.text__hashtags');
const imgUploadFormButton = form.querySelector('.img-upload__submit');

// валидация формы
const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper'
});

// хэш-тег допустимая форма
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const normalizeHashtag = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length)); // берет только заполненные хэштеги. пробелы неучитывает

const validateRegex = (str) => hashtag.test(str);

// валидация самого хештега
const validateHashtag = (oneHashtag) => {
  if (oneHashtag) {
    const hashtagItems = normalizeHashtag(oneHashtag);
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
  const hashtagItems = normalizeHashtag(hashtagsString).map((item) => item.toLowerCase());
  const hashtagItemsSet = new Set(hashtagItems);
  return hashtagItems.length === hashtagItemsSet.size;
};

// нельзя указать больше пяти хэш-тегов в поле ввода;
const validateHashtagsItemsCount = (hashtagsString) => normalizeHashtag(hashtagsString).length <= MAX_HASHTAGS_LENGTH;

pristine.addValidator(imgUploadHashtag, validateNoDuplicateHashtags, ErrorText.NOT_UNIQUE, 1 ,true);
pristine.addValidator(imgUploadHashtag, validateHashtag, ErrorText.INVALID_HASHTAG, 2, true);
pristine.addValidator(imgUploadHashtag, validateHashtagsItemsCount , ErrorText.INVALID_COUNT, 3 ,true);

const blockSubmitButton = () => {
  imgUploadFormButton.disabled = true;
  imgUploadFormButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  imgUploadFormButton.disabled = false;
  imgUploadFormButton.textContent = SubmitButtonText.IDLE;
};

const resetForm = () => {
  pristine.reset();
  form.reset();
};

const setOnUploadFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(form));
      unblockSubmitButton();
    }
  });
};

export { setOnUploadFormSubmit, resetForm };
