import { expect } from 'chai';
import { loop } from './loop';
import { zip } from './zip';
import { from } from './from';

describe('zip', () => {
  it('zips all the generator results into a generator of arrays', () => {
    const generators = [
      loop(from([1])),
      loop(from([1, 2, 3])),
      loop(from([3, 2, 1])),
      loop(from([34, 6])),
    ];
    const zippedGenerator = zip(generators);
    const iterator = zippedGenerator();

    expect(iterator.next()).to.have.deep.property('value', [1, 1, 3, 34]);
    expect(iterator.next()).to.have.deep.property('value', [1, 2, 2, 6]);
    expect(iterator.next()).to.have.deep.property('value', [1, 3, 1, 34]);
    expect(iterator.next()).to.have.deep.property('value', [1, 1, 3, 6]);
    expect(iterator.next()).to.have.deep.property('value', [1, 2, 2, 34]);
    expect(iterator.next()).to.have.deep.property('value', [1, 3, 1, 6]);
    expect(iterator.next()).to.have.deep.property('value', [1, 1, 3, 34]);
  });

  it('stops providing values as soon as one of the generators stop', () => {
    const generators = [
      from([1, 1, 1, 1]),
      loop(from([1, 2, 3])),
      loop(from([3, 2, 1])),
      loop(from([34, 6])),
    ];
    const zippedGenerator = zip(generators);
    const iterator = zippedGenerator();

    expect(iterator.next()).to.have.deep.property('value', [1, 1, 3, 34]);
    expect(iterator.next()).to.have.deep.property('value', [1, 2, 2, 6]);
    expect(iterator.next()).to.have.deep.property('value', [1, 3, 1, 34]);
    expect(iterator.next()).to.have.deep.property('value', [1, 1, 3, 6]);
    expect(iterator.next()).to.have.deep.property('done', true);
  });
});
