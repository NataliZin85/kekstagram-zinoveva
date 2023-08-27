import { showAlertMessage, debaunce } from './util.js';
import './data.js';
import { renderMiniPictures } from './miniPictures.js';
import './bigPictureModal.js';
import './bigPicture.js';
import './bigPictureComments.js';
import { setOnUploadFormSubmit } from './validateForm.js';
import { closeImgUploadForm } from './validateOpenForm.js';
import './imagePreview.js';
import './imagePreviewEffects.js';
import { getData, sendData } from './fetch-data.js';
import { showSuccessMessage, showErrorMessage } from './pictureFormSubmitMessage.js';
import { getFilteredPictures, init } from './filterMiniPictures.js';

getData()
  .then((uploadPicture) => {
    renderMiniPictures(uploadPicture);
    // getRandomFilter(() => (renderMiniPictures(uploadPicture)));
    // getRandomMiniPictures((uploadPicture) => renderMiniPictures(uploadPicture));
  })
  .catch((err) => {
    showAlertMessage(err.message);
  });

setOnUploadFormSubmit (async (data) => {
  try {
    await sendData (data);
    closeImgUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderMiniPictures = debaunce(renderMiniPictures);
  init(data, debouncedRenderMiniPictures);
  renderMiniPictures(getFilteredPictures());
} catch (err) {
  showAlertMessage('Попробуйте нажать на кнопку');
}
//   try {
//     await sendData (data);
//   } catch {
//     showAlertMessage('Попробуйте нажать на кнопку');
//   }
// });
