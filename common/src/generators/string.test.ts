import { expect } from 'chai';
import { take } from './operators';
import { string } from './string';


describe('string', () => {
  const ranges = [
    [0, 30],
    [5, 10],
    [99, 99],
    [0, 0],
  ];

  it('throws an exception when the rages include negatives', () => {
    expect(() => string(-3, 8)).to.throw();
    expect(() => string(-3, -1)).to.throw();
    expect(() => string(0, -8)).to.throw();
  });

  it('generates strings of a size between the range', () => {
    for (const [ from, to ] of ranges) {
      const generator = take(string(from, to), 10000);

      for (const str of generator()) {
        expect(str).to.be.a('string');
        expect(str.length).to.be.greaterThanOrEqual(from)
          .and.lessThanOrEqual(to);
      }
    }
  });
});
