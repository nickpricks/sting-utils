const lib = require('./index');

const ITERATIONS = 100_000;

function bench(name, fn) {
  const start = process.hrtime.bigint();
  for (let i = 0; i < ITERATIONS; i++) fn();
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1e6;
  const opsPerSec = Math.round((ITERATIONS / ms) * 1000).toLocaleString();
  console.log(`${name.padEnd(48)} ${opsPerSec.padStart(14)} ops/sec   (${ms.toFixed(1)}ms)`);
}

console.log(`\n=== string-common-utils v${require('./package.json').version} benchmarks ===`);
console.log(`    ${ITERATIONS.toLocaleString()} iterations per function\n`);

bench('parseEmptySting(null, "--")',                     () => lib.parseEmptySting(null, '--'));
bench('parseEmptySting("hello world", "--")',             () => lib.parseEmptySting('hello world', '--'));
bench('formatAsCurrency(1234567.89)',                     () => lib.formatAsCurrency(1234567.89));
bench('formatAsCurrency(-500, "$")',                      () => lib.formatAsCurrency(-500, '$'));
bench('capitalizeFirstLetter("hello")',                   () => lib.capitalizeFirstLetter('hello'));
bench('capitalizeWord("hello")',                          () => lib.capitalizeWord('hello'));
bench('capitalizeFirstLetterInWholeSentence("a b c d")', () => lib.capitalizeFirstLetterInWholeSentence('hello world foo bar'));
bench('getFileExtension("report.pdf")',                   () => lib.getFileExtension('report.pdf'));
bench('uuid(32)',                                         () => lib.uuid(32));
bench('uuid(8)',                                          () => lib.uuid(8));
bench('parseIntOrZero("42")',                             () => lib.parseIntOrZero('42'));
bench('parseFloatOrZero("3.14")',                         () => lib.parseFloatOrZero('3.14'));
bench('parseFloatToFixed(3.14159, 2)',                    () => lib.parseFloatToFixed(3.14159, 2));
bench('prefixZero(5)',                                    () => lib.prefixZero(5));
bench('inWords(12345)',                                   () => lib.inWords(12345));
bench('inWords(100000)',                                  () => lib.inWords(100000));

console.log('');
