import './util.js';
import { createObjects } from './data.js';
import { renderMiniPictures } from './miniPictures.js';
import './picturePopup.js';
import './bigPicture.js';

renderMiniPictures(createObjects()); // чтобы модули оставались независимыми
