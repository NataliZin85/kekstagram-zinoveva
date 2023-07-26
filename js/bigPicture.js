const bigPicture = document.querySelector('.big-picture');

const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const bigPictureComments = bigPicture.querySelector('.social__comments');
//const bigPictureComment = bigPicture.querySelector('.social__comment');

// клонирование комментариев из template - #comment
const createBigPictureComment = ({ avatar, name, message }) => {
  const comment = bigPictureCommentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// добавление клонированных комментариев в контейнер ".social__comments"
const renderBigComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createBigPictureComment(item);
    fragment.append(comment);
  });
  bigPictureComments.innerHTML = '';
  bigPictureComments.append(fragment);
};

const showBigPicture = (data) => {
  const {url, description, likes, comments} = data;

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
  bigPictureDescription.textContent = description;
};

export { showBigPicture, renderBigComments, createBigPictureComment };
