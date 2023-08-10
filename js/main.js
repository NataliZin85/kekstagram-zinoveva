import './util.js';
import { createObjects } from './data.js';
import { renderMiniPictures } from './miniPictures.js';
import './bigPictureModal.js';
import './bigPicture.js';
import './bigPictureComments.js';
import './form.js';
import './imagePreview.js';
import './imagePreviewEffects.js';

renderMiniPictures(createObjects()); // чтобы модули оставались независимыми
