import { showAlertMessage } from './util.js';
import './data.js';
import { renderMiniPictures } from './miniPictures.js';
import './bigPictureModal.js';
import './bigPicture.js';
import './bigPictureComments.js';
import { setOnUploadFormSubmit } from './validateForm.js';
import { closeImgUploadForm } from './validateOpenForm.js';
import './imagePreview.js';
import './imagePreviewEffects.js';
import { getData } from './fetch-data.js';
import { showSuccessMessage, showErrorMessage } from './pictureFormSubmitMessage.js';

getData()
  .then((uploadPicture) => {
    renderMiniPictures(uploadPicture);
  })
  .catch((err) => {
    showAlertMessage(err.message);
  });

setOnUploadFormSubmit (async (data) => {
  try {
    await getData (data);
    closeImgUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
