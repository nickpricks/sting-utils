import 'jest';
import {
  capitalize,
  cfl,
  pez,
  stringify,
  uuid
} from '../src'

const logs = (msg: string, ...args: any) => {
  const message = `===> [DEBUG] ${msg}`;
  console.info(message, args);
};


describe('Loading String Utils Tests...', () => {
  test('Testing parseEmptySting [pez] so that it would null values should be replaced', () => {
    const nullValue: null = null;
    const nullValDelimiter: string = '-- NULL VALUE --';
    expect(true).toBeTruthy();
    expect(pez(nullValue, nullValDelimiter)).toBe(nullValDelimiter);

    // throw new Error('parseEmptySting should change null or undefined values into delimiter.');
  });
  logs('Tests Successful...');
});
