const uuid = require('uuid/v4');

/**
 * STRING or INTEGER/FLOATS based Utilities
 */

/**
 * The NVL (null value logic) ==> Returns input string [or delimiter if null or undefined or '']
 * @param str {string} [Input sting to be tested]
 * @param delimiter [Defaults to '']
 * @return {string}
 */
exports.parseEmptySting = (str, delimiter = '') => {
  return str || delimiter;
};

/**
 * Format currency
 * @param str [Any number or numeric string]
 * @param currencySymbol [Defaults to $]
 * @param fractionalDigits [Defaults to 2]
 * @return {string}
 */
exports.formatAsCurrency = (str, currencySymbol = '$', fractionalDigits = 2) => {
  return `${currencySymbol}${exports.parseFloatToFixed(str, fractionalDigits).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`;
};

/**
 * Capitalize First Letter Of The Word
 * @param strInput
 * @return {string}
 */
exports.capitalizeFirstLetter = (strInput) => {
  return strInput.charAt(0).toUpperCase() + strInput.slice(1);
};

/**
 * Capitalize Word
 * @param str
 * @return {string}
 */
exports.capitalizeWord = str => str && typeof str === 'string' && str.toUpperCase();

/**
 * Capitalize First Letter Of Each Word In The Sentence
 * @param strInput
 * @return {string}
 */
exports.capitalizeFirstLetterInWholeSentence = (strInput) => {
  return strInput
    .split(' ')
    .map(str => exports.capitalizeFirstLetter(str))
    .join(' ');
};

/**
 * Get File Extension from fileName
 * @param fn
 */
exports.getFileExtension = fn => fn.substring(fn.lastIndexOf('.'), fn.length);

/**
 * Generates an uuid of given size
 * @param size
 * @param delimiter [optional] default is empty string
 * */
exports.uuid = (size, delimiter = '') => {
  let uuidV4 = `${uuid()}${uuid()}`;
  let sizeCounter = size;
  while (sizeCounter > uuidV4.length) {
    uuidV4 += `${uuid()}${uuid()}`;
    sizeCounter = sizeCounter + 2;
  }
  return uuidV4.replace(new RegExp('-', 'g'), delimiter).substring(0, size);
};

/**
 * Parse anything as integer
 * @param val
 * */
exports.parseIntOrZero = val => {
  return isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
};

/**
 * Parse anything as float
 * @param val
 * */
exports.parseFloatOrZero = val => {
  return isNaN(parseFloat(val)) ? 0 : parseFloat(val);
};

/**
 * Parse anything to Fixed
 * @param val
 * @param fractionalDigits
 * @return {string}
 */
exports.parseFloatToFixed = (val, fractionalDigits = 2) => {
  return (exports.parseFloatOrZero(val)).toFixed(fractionalDigits);
};

/**
 * Adds a prefix zero for single digit numbers and returns as string
 * @param anyNumber
 */
exports.prefixZero = anyNumber => {
  const stringNumber = anyNumber.toString();
  return stringNumber.length > 1 ? stringNumber : `0${stringNumber}`;
};

/**
 * Converts a Number to string in words
 * @param inputNum
 * @param postText (Anything to add at the end)
 * @return {*}
 */
exports.inWords = (inputNum, postText = '') => {
  const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ',
    'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  if ((inputNum = inputNum.toString()).length > 9) return 'overflow';
  let n = ('000000000' + inputNum).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  let inWordsStr = '';
  inWordsStr += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  inWordsStr += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  inWordsStr += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  inWordsStr += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  inWordsStr += (n[5] != 0)
    ? (inWordsStr ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + postText
    : '';
  return exports.capitalizeFirstLetterInWholeSentence(inWordsStr);
};

