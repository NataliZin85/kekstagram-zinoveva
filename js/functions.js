/*
// Функция для проверки длины строки.

function checkStringLength (stringValue, maxLength) {
  return stringValue.length <= maxLength;
}

console.log(checkStringLength('Проверяемая строка', 20)); // === true;
console.log(checkStringLength('Проверяемая строка', 10)); // === false;
console.log(checkStringLength('Проверяемая строка', 18)); // === true;

// Функция для проверки строки на «палиндромность».

function checkPalindrome (str) {
  const justString = str.replaceAll(' ', '').toLowerCase();

  let check = '';
  for (let i = justString.length - 1; i >= 0; --i) {
    check += justString[i];
  }

  // проверка
  console.log('just string ' + justString );
  console.log('check ' + check );

  return justString === check;
}

// Строка является палиндромом
console.log(checkPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(checkPalindrome('ДовОд')); // true
// Это не палиндром
console.log(checkPalindrome('Кекс')); // false
// Это палиндром
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true


// Функция, которая извлекает содержащиеся в строке цифры

function findNumber (x) {
  return parseInt(x.match(/\d+/));
}

console.log(findNumber('2023 год'));            // 2023
console.log(findNumber('ECMAScript 2022'));     // 2022
console.log(findNumber('1 кефир, 0.5 батона')); // 1
console.log(findNumber('агент 007'));           // 7
console.log(findNumber('а я томат'));           // NaN
*/

// функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи

const getTime = (timeString) => {
  const [hour, minute] = timeString.split(':');

  return hour * 60 + Number(minute);
};

function checkTime(startDay, endDay, meetingStart, meetingDuration) {
  const startDayTime = getTime(startDay);
  const endDayTime = getTime(endDay);
  const startMeetingTime = getTime(meetingStart);

  return (
    startMeetingTime >= startDayTime &&
    meetingStart + meetingDuration <= endDayTime
  );
}

checkTime('08:00', '17:30', '14:00', 90); // true
checkTime('8:0', '10:0', '8:0', 120); // true
checkTime('08:00', '14:30', '14:00', 90); // false
checkTime('14:00', '17:30', '08:0', 90); // false
checkTime('8:00', '17:30', '08:00', 900); // false
