import { expect } from 'chai';
import { skip } from './skip';
import { loop } from './loop';
import { from } from './from';


describe('skip', () => {
  it('skips the specified amount of element', () => {
    const generator = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const skippedGenerator = skip(generator, 3);

    expect([...skippedGenerator()]).to.deep.equal([4, 5, 6, 7, 8, 9]);
  });

  it('can deal with infinite generators', () => {
    const generator = loop(from([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    const skippedGenerator = skip(generator, 3);
    const iterator = skippedGenerator();

    expect(iterator.next()).to.have.property('value', 4);
    expect(iterator.next()).to.have.property('value', 5);
    expect(iterator.next()).to.have.property('value', 6);
    expect(iterator.next()).to.have.property('value', 7);
    expect(iterator.next()).to.have.property('value', 8);
    expect(iterator.next()).to.have.property('value', 9);
    expect(iterator.next()).to.have.property('value', 1);
    expect(iterator.next()).to.have.property('value', 2);
    expect(iterator.next()).to.have.property('value', 3);
    expect(iterator.next()).to.have.property('value', 4);
  });
});
