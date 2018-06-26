/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(3);
var bytesToUuid = __webpack_require__(2);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const uuid = __webpack_require__(0);

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



/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ })
/******/ ]);