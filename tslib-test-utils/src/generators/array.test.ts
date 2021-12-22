import { assert, expect } from 'chai';
import { take } from './operators';
import { integer } from './integer';
import { string } from './string';
import { number } from './number';
import { boolean } from './boolean';
import { char } from './char';
import { array } from './array';


describe('array', () => {
  const ranges = [
    [0, 30],
    [5, 10],
    [99, 99],
    [0, 0],
  ];

  const contents: [
    () => IterableIterator<unknown>,
    (x: unknown) => boolean
  ][] = [
    [char(), str => typeof str === 'string' && str.length === 1],
    [number(), nm => typeof nm === 'number'],
    [boolean(), nm => typeof nm === 'boolean'],
    [integer(), nm => typeof nm === 'number' && Math.floor(nm) === nm],
  ];

  it('throws an exception when the rages include negatives', () => {
    expect(() => string(-3, 8)).to.throw();
    expect(() => string(-3, -1)).to.throw();
    expect(() => string(0, -8)).to.throw();
  });

  it('generates arrays of a size between the range with elements of the type', () => {
    for (const [from, to] of ranges) {
      for (const [content, assertion] of contents) {
        const generator = take(array(content, from, to), 10000);

        for (const arr of generator()) {
          expect(arr).to.be.an('array');
          expect(arr.length).to.be.greaterThanOrEqual(from)
            .and.lessThanOrEqual(to);
          assert(arr.every(assertion));
        }
      }
    }
  });
});
