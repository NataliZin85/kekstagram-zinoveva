import './util.js';
import { createObjects } from './data.js';
import { renderMiniPictures } from './miniPictures.js';
import './bigPictureModal.js';
import './bigPicture.js';
import './bigPictureComments.js';

renderMiniPictures(createObjects()); // чтобы модули оставались независимыми
