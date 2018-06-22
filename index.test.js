const {
  parseEmptySting,
  formatAsCurrency,
  capitalizeFirstLetter,
  capitalizeWord,
  capitalizeFirstLetterInWholeSentence,
  getFileExtension,
  uuid,
  parseIntOrZero,
  parseFloatOrZero,
  parseFloatToFixed,
  prefixZero,
  inWords
} = require('./index');


console.log('Loading Tests...');

const case1 = `Testing an ${parseEmptySting(null || '--')} so that it would be replaced by --`;
if (case1.indexOf('--') <= -1) {
  throw new Error('parseEmptySting should change null or undefined values into delimiter.');
}

const case2 = formatAsCurrency('500', '₹', 2);
if (case2 !== '₹500.00') {
  throw new Error('formatAsCurrency should parse numeric string as currency.');
}

console.log('Tests Successful...');