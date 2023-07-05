import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';

const PHOTO_DESCRIPTION = [
  'Ваши первые 10 000 фотографий – Ваши худшие',
  'Которая из моих фотографий самая любимая? Та, которую я собираюсь снять завтра',
  'Выдающаяся фотография – это глубина чувств, а не глубина резкости',
  'Вы не фотографируете, вы создаете',
  'Если ваши снимки не достаточно хороши, значит, вы находитесь не достаточно близко',
  'Что мне нравится в фотографии, так это то, что в ней пойман момент, который ушел навсегда, который невозможно воспроизвести',
  'Я не интересуюсь правилами или конвенцией. Фотография это не спорт',
  'Лучшие изображения это те, которые сохраняют свою силу и влияние на протяжении многих лет, независимо от того, сколько раз их рассматривают',
  'Нет никаких правил для хороших фотографий, есть только хорошие фотографии',
  'Красоту можно подметить во всем, виденье и составление красоты это то, что отделяет снимок от фотографии',
  'Если у меня и есть что сказать новичку, то это то, что в фотографии нет коротких путей',
  'Конечно, все дело в удаче',
  'В каждой фотографии всегда есть два человека: фотограф и зритель',
  'Мир просто не укладывается в формат 35-мм камеры',
  'Послушайте, я не интеллигент - я просто фотографирую',
  'Смотрите и думайте, прежде чем открывать затвор. Сердце и разум – это истинный объектив камеры',
  'Для фотографа важнее иметь очень хорошую обувь, чем очень хорошую камеру',
  'Я всегда думал, что хорошие фотографии, как хорошие шутки. Если вы их объясняете, они уже не так хороши',
  'Покупка Nikon не делает вас фотографом. Она делает вас владельцем Nikon',
  'Фотографии – это открытые двери в прошлое, но они позволяют заглянуть в будущее',
  'Хороший снимок останавливает ускользающее мгновение',
  'Фотография подбирает факт из жизни, и он будет жить вечно',
  'Важнее ладить с людьми, чем щелкать затвором',
  'Подлинная тайна мира – это видимое, а не невидимое',
  'Что делает фотографию странным изобретением так это то, что первичным сырьем для нее служит свет и время',
];

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAME = [
  'Максим',
  'Алиса',
  'Настя',
  'Саша',
  'Ангелина',
  'Анисья',
  'Клим',
];

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createRandomInteger = (a, b) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      // console.error(`Перебраны все числа из диапазона от ${ a } до ${ b }`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// решение для одного или двух сгенерированных комментариев-message в коментарии:
const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENT_MESSAGE),
).join(' ');

// создаем комментарии
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ createRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(COMMENT_NAME),
});

// создаем объект с фотографией и комментариями
const createObject = (index) => ({
  id: index,
  url: `photos/${ index }.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: createRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT) (),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const createObjects = () => Array.from(
  { length: PICTURE_COUNT },
  (_,pictureIndex) => createObject(pictureIndex + 1),
);

export {createObjects};
