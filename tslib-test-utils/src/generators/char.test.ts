import { expect } from 'chai';
import { take } from './operators';
import { char } from './char';


describe('char', () => {
  const rangesAndSet = [
    [['a', 'z'], 'abcdefghijklmnopqrstuvwxyz'.split('')],
    [['A', 'Z'], 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')],
    [
      ['A', 'z'],
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz'.split(''),
    ],
    [[':', '@'], ':;<=>?@'.split('')],
  ];

  it('always generates chars inside of the set', () => {
    for (const [ [ from, to ], set] of rangesAndSet) {
      const generator = take(char(from, to), 10000);

      for (const character of generator()) {
        expect(set).to.include(character);
      }
    }
  });

  it('eventually generates every char in the range set', () => {
    for (const [ [ from, to ], set ] of rangesAndSet) {
      const generator = char(from, to);
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
