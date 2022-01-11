import { expect } from 'chai';
import { take } from './operators';
import { integer } from './integer';


describe('integer', () => {
  const ranges = [
    [0, 1],
    [-1, 0],
    [Number.MIN_SAFE_INTEGER, 0],
    [0, Number.MAX_SAFE_INTEGER],
    [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    [1000, 124345],
    [-4392302, -213421],
    [-1232, 21343],
  ];

  it('always generates numbers inside of the specified range', () => {
    for (const [from, to] of ranges) {
      const generator = take(integer(from, to), 10000);

      for (const num of generator()) {
        expect(num).to.be.greaterThanOrEqual(from).and.below(to);
      }
    }
  });

  it('always generate a valid integer', () => {
    for (const [from, to] of ranges) {
      const generator = take(integer(from, to), 10000);

      for (const num of generator()) {
        expect(num).to.be.a('number');
        expect(num).to.not.be.NaN;
        expect(num).to.be.finite;
        expect(num).to.equal(Math.floor(num));
      }
    }
  });
});
