import { expect } from 'chai';
import { number } from './number';
import { take } from './operators';


describe('number', () => {
  const ranges = [
    [0, 1],
    [-1, 0],
    [-Number.MAX_VALUE, 0],
    [0, Number.MAX_VALUE],
    [-Number.MAX_VALUE, Number.MAX_VALUE],
    [1000, 124345.2435],
    [-4392302, -213421],
    [-1232, 21343],
  ];

  it('always generates numbers inside of the specified range', () => {
    for (const [from, to] of ranges) {
      const generator = take(number(from, to), 10000);

      for (const num of generator()) {
        expect(num).to.be.greaterThanOrEqual(from).and.below(to);
      }
    }
  });

  it('always generate a valid number', () => {
    for (const [from, to] of ranges) {
      const generator = take(number(from, to), 10000);

      for (const num of generator()) {
        expect(num).to.be.a('number');
        expect(num).to.not.be.NaN;
        expect(num).to.be.finite;
      }
    }
  });
});
