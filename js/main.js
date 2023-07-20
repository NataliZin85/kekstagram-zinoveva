import './util.js';
import {createObjects} from './data.js';
import { renderMiniPictures } from './miniPictures.js';

renderMiniPictures(createObjects()); // чтобы модули оставались независимыми
