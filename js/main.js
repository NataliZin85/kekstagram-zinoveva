import { showAlertMessage, debounce } from './util.js';
import { renderMiniPictures } from './mini-pictures.js';
import './big-picture-modal.js';
import './big-picture.js';
import './big-picture-comments.js';
import { setOnUploadFormSubmit } from './validate-form.js';
import { closeImgPreviewForm } from './validate-open-form.js';
import './image-preview.js';
import './image-preview-effects.js';
import { getData, sendData } from './fetch-data.js';
import { showSuccessMessage, showErrorMessage } from './picture-form-submit-message.js';
import { getFilteredPictures, initUploadImgFilters } from './filter-mini-pictures.js';

getData()
  .then((data) => {
    const debouncedRenderMiniPictures = debounce(renderMiniPictures);
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
