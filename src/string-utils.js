"use strict";
exports.__esModule = true;
/**
 * capitalize First Letter Of The Word
 * @param strInput
 */
exports.cfl = function (strInput) { return strInput.charAt(0).toUpperCase() + strInput.slice(1); };
/**
 * capitalize Word
 * @param strInput
 */
exports.capitalize = function (strInput) { return strInput.toUpperCase(); };
/**
 * Capitalize First Letter Of Each Word In The Sentence
 * @param strInput
 * @param separator
 * @return {string}
 */
var capitalizeFirstLetterInWholeSentence = function (strInput, separator) {
    if (separator === void 0) { separator = ' '; }
    return strInput
        .split(separator)
        .map(function (str) { return exports.cfl(str); })
        .join(separator);
};
/**
 * Get File Extension from fileName
 * @param fn File Name
 */
var extractFileExtension = function (fn) { return fn.substring(fn.lastIndexOf('.'), fn.length); };
/**
 * Parse Empty String
 * Returns input string [or delimiter if encounters null or undefined or '']
 * @param str
 * @param delimiter
 */
exports.pez = function (str, delimiter) {
    if (delimiter === void 0) { delimiter = ''; }
    return str ? str.trim() : delimiter;
};
/**
 * Adds a prefix zero for single digit numbers and returns as string
 * @param anyOneDigitNumber
 */
var prefixAZero = function (anyOneDigitNumber) {
    var strNumber = anyOneDigitNumber.toString();
    return strNumber.length > 1 ? strNumber : "0" + strNumber;
};
/**
 * stringify a JSON object
 * @param o
 */
exports.stringify = function (o) { return JSON.stringify(o, null, 2); };
/**
 * Generates an uuid of given size
 * @param size [optional] defaults to 50
 * @param delimiter [optional] default is empty string
 * */
exports.uuid = function (size, delimiter) {
    if (size === void 0) { size = 50; }
    if (delimiter === void 0) { delimiter = ''; }
    var uniqueCode = function uniqueCode(a) {
        return a ?
            (a ^ Math.random() * 16 >> a / 4).toString(16) :
            // @ts-ignore
            ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uniqueCode);
    };
    var uc = uniqueCode();
    while ((2 * size) > uc.length) {
        uc += uniqueCode();
    }
    return uc.replace(new RegExp('-', 'g'), delimiter).substring(0, size);
};
