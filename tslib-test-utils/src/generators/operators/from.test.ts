import { expect } from 'chai';
import { from } from './from';


describe('from', () => {
  it('creates a generator with all the elements in sequence', () => {
    const generator = from([1, 4, 7]);
    const iterator = generator();

    expect(iterator.next()).to.have.property('value', 1);
    expect(iterator.next()).to.have.property('value', 4);
    expect(iterator.next()).to.have.property('value', 7);
    expect(iterator.next()).to.have.property('done', true);
  });
});
