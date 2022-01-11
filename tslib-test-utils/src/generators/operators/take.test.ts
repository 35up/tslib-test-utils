import { expect } from 'chai';
import { loop } from './loop';
import { take } from './take';
import { from } from './from';

describe('take', () => {
  it('takes the specified amount of element', () => {
    const generator = loop(from([1, 0]));
    const takenGenerator = take(generator, 30);

    expect([...takenGenerator()]).to.have.lengthOf(30);
  });

  it('does not take more elements than available', () => {
    const generator = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const takenGenerator = take(generator, 30);

    expect([...takenGenerator()]).to.have.lengthOf(9);
  });
});
