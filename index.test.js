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

let passed = 0;
let failed = 0;

function assert(label, actual, expected) {
  if (actual === expected) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    console.error(`    expected: ${JSON.stringify(expected)}`);
    console.error(`    received: ${JSON.stringify(actual)}`);
    failed++;
  }
}

console.log('\n=== string-common-utils tests ===\n');

// ===== parseEmptySting =====
console.log('parseEmptySting:');
assert('null returns delimiter',         parseEmptySting(null, '--'),  '--');
assert('0 is a valid value, not empty',  parseEmptySting(0, 'N/A'),    0);
assert('empty string returns delimiter', parseEmptySting('', '--'),    '--');

// ===== formatAsCurrency =====
console.log('\nformatAsCurrency:');
assert('formats positive number',        formatAsCurrency('500', '₹', 2),   '₹500.00');
assert('negative: minus before symbol',  formatAsCurrency(-1234.5, '$', 2), '-$1,234.50');
assert('zero formats correctly',         formatAsCurrency(0, '$', 2),        '$0.00');

// ===== capitalizeFirstLetter =====
console.log('\ncapitalizeFirstLetter:');
assert('normal string',                  capitalizeFirstLetter('hello'),  'Hello');
assert('empty string returns empty',     capitalizeFirstLetter(''),       '');
assert('null returns empty string',      capitalizeFirstLetter(null),     '');

// ===== capitalizeWord =====
console.log('\ncapitalizeWord:');
assert('normal string uppercased',       capitalizeWord('hello'),  'HELLO');
assert('number returns empty string',    capitalizeWord(123),      '');
assert('null returns empty string',      capitalizeWord(null),     '');

// ===== capitalizeFirstLetterInWholeSentence =====
console.log('\ncapitalizeFirstLetterInWholeSentence:');
assert('capitalizes each word',          capitalizeFirstLetterInWholeSentence('hello world'), 'Hello World');
assert('single word',                    capitalizeFirstLetterInWholeSentence('hello'),       'Hello');
assert('null returns empty string',      capitalizeFirstLetterInWholeSentence(null),          '');

// ===== getFileExtension =====
console.log('\ngetFileExtension:');
assert('returns extension with dot',     getFileExtension('file.txt'),    '.txt');
assert('no extension returns empty',     getFileExtension('README'),      '');
assert('leading dot returns empty',      getFileExtension('.gitignore'),  '');

// ===== uuid =====
console.log('\nuuid:');
assert('returns correct length (32)',    uuid(32).length,   32);
assert('returns correct length (10)',    uuid(10).length,   10);
assert('invalid size returns empty',     uuid(0),           '');

// ===== parseIntOrZero =====
console.log('\nparseIntOrZero:');
assert('parses integer string',          parseIntOrZero('42'),    42);
assert('truncates float string',         parseIntOrZero('3.9'),   3);
assert('null returns 0',                 parseIntOrZero(null),    0);

// ===== parseFloatOrZero =====
console.log('\nparseFloatOrZero:');
assert('parses float string',            parseFloatOrZero('3.14'),    3.14);
assert('Infinity returns 0',             parseFloatOrZero(Infinity),  0);
assert('null returns 0',                 parseFloatOrZero(null),      0);

// ===== parseFloatToFixed =====
console.log('\nparseFloatToFixed:');
assert('rounds to 2 decimal places',     parseFloatToFixed(3.14159, 2),  '3.14');
assert('null value returns 0.00',        parseFloatToFixed(null, 2),     '0.00');
assert('0 fractional digits',            parseFloatToFixed(3.7, 0),      '4');

// ===== prefixZero =====
console.log('\nprefixZero:');
assert('pads single digit',              prefixZero(5),     '05');
assert('does not pad double digit',      prefixZero(12),    '12');
assert('null returns empty string',      prefixZero(null),  '');

// ===== inWords =====
console.log('\ninWords:');
assert('converts number to words',       inWords(12345),  'Twelve Thousand Three Hundred And Forty Five ');
assert('zero returns Zero',              inWords(0),      'Zero');
assert('null returns empty string',      inWords(null),   '');

// ===== Summary =====
console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
