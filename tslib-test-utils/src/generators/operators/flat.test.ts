import { expect } from 'chai';
import { flat } from './flat';
import { loop } from './loop';
import { from } from './from';

describe('flat', () => {
  it('joins generators in sequence', () => {
    const nestedGenerators = from([
      from([1]),
      from([2, 3]),
      from([4, 5, 6]),
      from([7]),
    ]);

    const generator = flat(nestedGenerators);
    const iterator = generator();

    expect([...iterator]).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
  });

  it('can deal with infinite generators', () => {
    const nestedGenerators = from([
      from([1]),
      loop(from([2, 3])),
    ]);

    const generator = flat(nestedGenerators);
    const iterator = generator();

    expect(iterator.next()).to.have.property('value', 1);
    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 3);
    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 3);
  });

  it('can deal with infinite generators of generators', () => {
    const nestedGenerators = loop(from([
      from([1]),
      from([2, 3]),
    ]));

    const generator = flat(nestedGenerators);
    const iterator = generator();

    expect(iterator.next()).to.have.property('value', 1);
    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 3);
    expect(iterator.next()).to.have.property('value', 1);
    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 3);
    expect(iterator.next()).to.have.property('value', 1);
  });
});
