
/**
 * capitalize First Letter Of The Word
 * @param strInput
 */
export const cfl = (strInput: string) => strInput.charAt(0).toUpperCase() + strInput.slice(1);

/**
 * capitalize Word
 * @param strInput
 */
export const capitalize = (strInput: string) => strInput.toUpperCase();


/**
 * Capitalize First Letter Of Each Word In The Sentence
 * @param strInput
 * @param separator
 * @return {string}
 */
const capitalizeFirstLetterInWholeSentence = (strInput: string, separator: string = ' ') => {
  return strInput
    .split(separator)
    .map(str => cfl(str))
    .join(separator);
};


/**
 * Get File Extension from fileName
 * @param fn File Name
 */
const extractFileExtension = (fn: string) => fn.substring(fn.lastIndexOf('.'), fn.length);

/**
 * Parse Empty String
 * Returns input string [or delimiter if encounters null or undefined or '']
 * @param str
 * @param delimiter
 */
export const pez = (str?: any, delimiter: string = '') => str ? str.trim() : delimiter;

/**
 * Adds a prefix zero for single digit numbers and returns as string
 * @param anyOneDigitNumber
 */
const prefixAZero = (anyOneDigitNumber: number) => {
  const strNumber = anyOneDigitNumber.toString();
  return strNumber.length > 1 ? strNumber : `0${strNumber}`;
};

/**
 * stringify a JSON object
 * @param o
 */
export const stringify = (o: Object) => JSON.stringify(o, null, 2);

/**
 * Generates an uuid of given size
 * @param size [optional] defaults to 50
 * @param delimiter [optional] default is empty string
 * */
export const uuid = (size: number = 50, delimiter: string = '') => {
  const uniqueCode = function uniqueCode(a?: any) {
    return a ?
      (a ^ Math.random() * 16 >> a / 4).toString(16) :
      // @ts-ignore
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uniqueCode)
  };
  let uc = uniqueCode();
  while ((2 * size) > uc.length) {
    uc += uniqueCode();
  }

  return uc.replace(new RegExp('-', 'g'), delimiter).substring(0, size);
};
