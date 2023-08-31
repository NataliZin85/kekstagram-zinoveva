const INITIAL_COMMENTS_COUNT = 5;
const DEFAULT_STEP = 5;

const bigPicture = document.querySelector('.big-picture');

const bigPictureCommentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const bigPictureComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCurrentCommentsCount = bigPicture.querySelector('[data-current-comments-count]');
const bigPictureTotalCommentsCount = bigPicture.querySelector('.comments-count');

let currentCountComment = 0;
let totalCountComment = INITIAL_COMMENTS_COUNT;
let commentElements = [];

// клонирование комментариев из template - #comment
const createBigPictureComment = ({ avatar, name, message }, index) => {
  const comment = bigPictureCommentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  if (index >= currentCountComment) {
    comment.classList.add('hidden');
  }

  return comment;
};

const showComments = () => {
  commentElements.forEach((element, index) => {
    if (index < currentCountComment) {
      element.classList.remove('hidden');
    }
  });
};

const handleCommentsLoaderClick = () => {
  if (currentCountComment < totalCountComment) {
    const tailStep = totalCountComment - currentCountComment;
    const step = tailStep < DEFAULT_STEP ? tailStep : DEFAULT_STEP;
    currentCountComment += step;
    bigPictureCurrentCommentsCount.textContent = currentCountComment;
    showComments();
    if (currentCountComment === totalCountComment) {
      commentsLoader.classList.add('hidden');
    }
  }
};

// добавление клонированных комментариев в контейнер ".social__comments"
const renderBigComments = (comments) => {
  // счетчик комментариев
  currentCountComment = comments.length <= INITIAL_COMMENTS_COUNT ? comments.length : INITIAL_COMMENTS_COUNT;
  bigPictureCurrentCommentsCount.textContent = currentCountComment;
  bigPictureTotalCommentsCount.textContent = comments.length;
  totalCountComment = comments.length;

  // кнопка загрузки
  if (comments.length <= INITIAL_COMMENTS_COUNT) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  // добавление комментариев
  const fragment = document.createDocumentFragment();
  comments.forEach((item, index) => {
    const comment = createBigPictureComment(item, index);
    fragment.append(comment);
  });
  bigPictureComments.innerHTML = '';
  bigPictureComments.append(fragment);
  commentElements = bigPictureComments.querySelectorAll('li');
};

commentsLoader.addEventListener('click', handleCommentsLoaderClick);

export { renderBigComments, createBigPictureComment };
