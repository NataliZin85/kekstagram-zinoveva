import { showAlertMessage, debaunce } from './util.js';
import './data.js';
import { renderMiniPictures } from './miniPictures.js';
import './bigPictureModal.js';
import './bigPicture.js';
import './bigPictureComments.js';
import { setOnUploadFormSubmit } from './validateForm.js';
import { closeImgPreviewForm } from './validateOpenForm.js';
import './imagePreview.js';
import './imagePreviewEffects.js';
import { getData, sendData } from './fetch-data.js';
import { showSuccessMessage, showErrorMessage } from './pictureFormSubmitMessage.js';
import { getFilteredPictures, initUploadImgFilters } from './filterMiniPictures.js';

getData()
  .then((data) => {
    const debouncedRenderMiniPictures = debaunce(renderMiniPictures);
    initUploadImgFilters(data, debouncedRenderMiniPictures);
    renderMiniPictures(getFilteredPictures());
  })
  .catch((err) => {
    showAlertMessage(err.message);
  });

setOnUploadFormSubmit (async (data) => {
  try {
    await sendData (data);
    closeImgPreviewForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
