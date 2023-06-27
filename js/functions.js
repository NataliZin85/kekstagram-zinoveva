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
