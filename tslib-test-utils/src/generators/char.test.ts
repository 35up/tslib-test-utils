import { expect } from 'chai';
import { take } from './operators';
import {
  ALL,
  char,
  LOWER_CASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPER_CASE_LETTERS,
} from './char';


const SETS = [
  LOWER_CASE_LETTERS,
  UPPER_CASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  ALL,
];

describe('char', () => {
  it('always generates chars inside of the set', () => {
    for (const set of SETS) {
      const generator = take(char(set), 10000);

      for (const character of generator()) {
        expect(set).to.include(character);
      }
    }
  });

  it('eventually generates every char in the range set', () => {
    for (const set of SETS) {
      const generator = char(set);
      const iterator = generator();
      const actualSet = new Set(set);

      while (actualSet.size > 0) {
        const { value } = iterator.next();
        if (actualSet.has(value)) {
          actualSet.delete(value);
        }
      }

      // this should end eventually, otherwise the test will hang or timeout
    }
  });
});
