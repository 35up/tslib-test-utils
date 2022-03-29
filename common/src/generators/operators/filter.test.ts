import { expect } from 'chai';
import { filter } from './filter';
import { loop } from './loop';
import { from } from './from';


describe('filter', () => {
  it('skips element that do not match the predicate', () => {
    const generator = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const filteredGenerator = filter(generator, num => num % 2 === 0);

    expect([...filteredGenerator()]).to.deep.equal([2, 4, 6, 8]);
  });

  it('can deal with infinite generators', () => {
    const generator = loop(from([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    const filteredGenerator = filter(generator, num => num % 2 === 0);
    const iterator = filteredGenerator();

    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 4);
    expect(iterator.next()).to.have.property('value', 6);
    expect(iterator.next()).to.have.property('value', 8);
    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 4);
    expect(iterator.next()).to.have.property('value', 6);
    expect(iterator.next()).to.have.property('value', 8);
    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 4);
  });
});
