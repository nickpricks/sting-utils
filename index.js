const uuid = require('uuid/v4');

/**
 * STRING or INTEGER/FLOATS based Utilities
 */

/**
 * The NVL (null value logic) ==> Returns input value [or delimiter if null, undefined, or '']
 * @param str {*} [Input value to be tested]
 * @param delimiter [Defaults to '']
 * @return {*}
 */
exports.parseEmptySting = (str, delimiter = '') => {
  return (str === null || str === undefined || str === '') ? delimiter : str;
};

/**
 * Format currency
 * @param str {number|string} [Any number or numeric string]
 * @param currencySymbol {string} [Defaults to $]
 * @param fractionalDigits {number} [Defaults to 2]
 * @return {string}
 */
exports.formatAsCurrency = (str, currencySymbol = '$', fractionalDigits = 2) => {
  const num = exports.parseFloatOrZero(str);
  const abs = exports.parseFloatToFixed(Math.abs(num), fractionalDigits);
  const formatted = abs.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  return num < 0 ? `-${currencySymbol}${formatted}` : `${currencySymbol}${formatted}`;
};

/**
 * Capitalize First Letter Of The Word
 * @param strInput {string}
 * @return {string}
 */
exports.capitalizeFirstLetter = (strInput) => {
  if (!strInput || typeof strInput !== 'string') return '';
  return strInput.charAt(0).toUpperCase() + strInput.slice(1);
};

/**
 * Capitalize entire word (uppercase)
 * @param str {string}
 * @return {string}
 */
exports.capitalizeWord = str => (str && typeof str === 'string') ? str.toUpperCase() : '';

/**
 * Capitalize First Letter Of Each Word In The Sentence
 * @param strInput {string}
 * @return {string}
 */
exports.capitalizeFirstLetterInWholeSentence = (strInput) => {
  if (!strInput || typeof strInput !== 'string') return '';
  return strInput
    .split(' ')
    .map(str => exports.capitalizeFirstLetter(str))
    .join(' ');
};

/**
 * Get File Extension from fileName (includes leading dot, e.g. '.txt')
 * Returns '' if no valid extension found.
 * @param fn {string}
 * @return {string}
 */
exports.getFileExtension = fn => {
  if (!fn || typeof fn !== 'string') return '';
  const dot = fn.lastIndexOf('.');
  return dot <= 0 ? '' : fn.substring(dot);
};

/**
 * Generates a uuid string of given size
 * @param size {number}
 * @param delimiter {string} [optional] replaces hyphens, default is empty string
 * @return {string}
 * */
exports.uuid = (size, delimiter = '') => {
  if (!size || size <= 0 || !isFinite(size)) return '';
  let result = '';
  while (result.length < size) {
    result += uuid().replace(/-/g, delimiter);
  }
  return result.substring(0, size);
};

/**
 * Parse anything as integer, returns 0 for non-numeric input
 * @param val {*}
 * @return {number}
 * */
exports.parseIntOrZero = val => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Parse anything as float, returns 0 for non-numeric or non-finite input
 * @param val {*}
 * @return {number}
 * */
exports.parseFloatOrZero = val => {
  const parsed = parseFloat(val);
  return (isNaN(parsed) || !isFinite(parsed)) ? 0 : parsed;
};

/**
 * Parse anything to Fixed decimal string
 * @param val {*}
 * @param fractionalDigits {number} [Defaults to 2]
 * @return {string}
 */
exports.parseFloatToFixed = (val, fractionalDigits = 2) => {
  return (exports.parseFloatOrZero(val)).toFixed(fractionalDigits);
};

/**
 * Adds a prefix zero for single digit numbers and returns as string
 * @param anyNumber {number}
 * @return {string}
 */
exports.prefixZero = anyNumber => {
  if (anyNumber === null || anyNumber === undefined) return '';
  const stringNumber = anyNumber.toString();
  return stringNumber.length > 1 ? stringNumber : `0${stringNumber}`;
};

/**
 * Converts a non-negative integer to string in words (Indian numbering: crore/lakh)
 * Returns '' for null, undefined, or negative input.
 * Returns 'overflow' for numbers > 9 digits.
 * @param inputNum {number|string}
 * @param postText {string} (Suffix to append after ones/tens portion)
 * @return {string}
 */
exports.inWords = (inputNum, postText = '') => {
  if (inputNum === null || inputNum === undefined) return '';
  const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ',
    'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const strNum = inputNum.toString();
  if (parseFloat(strNum) < 0) return '';
  if (parseFloat(strNum) === 0) return postText ? `Zero ${postText}` : 'Zero';
  if (strNum.length > 9) return 'overflow';
  const n = ('000000000' + strNum).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
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
